import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'
import type { File } from 'formidable'
import { FileLimitExceededError, InvalidFileTypeError } from '~/core/exception/fileErrors'

// 类型定义
export interface UploadResult {
  originalName?: string
  fileName: string
  url: string
  size: number
  mimetype: string
  filePath: string
}

// 文件验证函数
export async function validateFiles(
  files: File[],
  options: {
    maxCount: number // 最大上传数量
    maxSize: number // 最大上传大小（字节）
    allowedTypes: string[] // 允许的文件类型
  }
): Promise<File[]> {
  // 数量验证
  if (files.length > options.maxCount) {
    throw new FileLimitExceededError(`最多允许上传 ${options.maxCount} 个文件`)
  }

  // 逐个验证
  for (const file of files) {
    // 类型验证
    if (!options.allowedTypes.includes(file.mimetype as string)) {
      throw new InvalidFileTypeError(
        `不支持的文件类型：${file.mimetype}，允许的类型为：${options.allowedTypes.join(', ')}`
      )
    }

    // 大小验证
    if (file.size > options.maxSize) {
      throw new FileLimitExceededError(
        `文件 ${file.originalFilename} 超过大小限制（最大 ${options.maxSize / 1024 / 1024}MB）`
      )
    }
  }

  return files
}

// 安全上传函数
export async function uploadFile(files: File[]): Promise<UploadResult[]> {
  const uploadDir = getUploadDir()
  await ensureDir(uploadDir)

  return Promise.all(
    files.map(async (file) => {
      try {
        const fileInfo = await processSingleFile(file, uploadDir)
        await fs.rename(file.filepath, fileInfo.filePath)
        return fileInfo
      } catch (error) {
        await fs.unlink(file.filepath).catch(() => {})
        throw error
      }
    })
  )
}

function getUploadDir() {
  return path.join(
    process.cwd(),
    'public/uploads',
    new Date().toISOString().split('T')[0] // 按日期分目录
  )
}

async function ensureDir(dirPath: string) {
  await fs.mkdir(dirPath, { recursive: true })
}

async function processSingleFile(file: File, uploadDir: string): Promise<UploadResult> {
  const originalName = sanitizeFilename(file.originalFilename || '')
  const fileExt = path.extname(originalName) || getExtensionByMime(file.mimetype as string)
  const fileName = `${uuidv4()}${fileExt}`
  const filePath = path.join(uploadDir, fileName)

  return {
    originalName,
    fileName,
    url: `/uploads/${path.basename(uploadDir)}/${fileName}`,
    size: file.size,
    mimetype: file.mimetype as string,
    filePath,
  }
}

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9_\u4e00-\u9fa5\-\.]/g, '')
}

function getExtensionByMime(mimetype: string) {
  const extMap: Record<string, string> = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'application/pdf': '.pdf',
    'application/zip': '.zip',
  }
  return extMap[mimetype] || '.bin'
}
