import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'
import { FileLimitExceededError, InvalidFileTypeError } from '~/core/exception/fileErrors'
import { UploadResult, File } from '~/typings/global'

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
    url: `/${path.basename(uploadDir)}/${fileName}`,
    size: file.size,
    mimetype: file.mimetype,
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
    'text/plain': '.txt',
  }
  return extMap[mimetype] || '.bin'
}

/**
 *
 * @param files -- 文件列表
 * @param options -- 验证参数
 * @returns -- 验证后的文件列表
 */
export async function validateFiles(
  files: File[],
  options: {
    maxCount: number
    maxSize: number
    allowedTypes: string[]
    noTypeCheck?: boolean
  }
): Promise<File[]> {
  // 数量验证
  if (files.length > options.maxCount) {
    const message = `最多允许上传 ${options.maxCount} 个文件`
    throw new FileLimitExceededError(message)
  }

  // 逐个验证
  for (const file of files) {
    // 类型验证
    if (!file.mimetype) {
      return []
    }
    
    if (options.noTypeCheck) {
      if (!options.allowedTypes.includes(file.mimetype)) {
        const message = `不支持的文件类型：${file.mimetype}，允许的类型为：${options.allowedTypes.join(', ')}`
        throw new InvalidFileTypeError(message)
      }
    }

    // 大小验证
    if (file.size > options.maxSize) {
      const message = `文件大小超过限制：${file.size} 字节，最大允许大小为：${options.maxSize} 字节`
      throw new FileLimitExceededError(message)
    }
  }

  return files
}
