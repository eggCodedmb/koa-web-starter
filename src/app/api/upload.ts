import type { Context } from 'koa'
import { body, description, path, prefix, query, request, security, summary, tags } from 'koa-swagger-decorator'
import auth, { authAll } from '~/core/auth'
import { uploadFile, validateFiles } from '~/utils/locaUpload'
import { FileLimitExceededError, InvalidFileTypeError } from '~/core/exception/fileErrors'
import fs from 'fs'

const tag = tags(['文件上传'])

@prefix('/file')
@authAll
export default class UploadController {
  /**
   * 文件上传接口
   * @swagger
   * security:
   *   - api_key: []
   * consumes:
   *   - multipart/form-data
   */
  @request('post', '/upload')
  @summary('安全文件上传接口')
  @description(`
    支持格式：PNG/JPG/PDF/ZIP
    最大文件大小：10MB
    批量限制：最多5个文件
  `)
  @tag
  @body({
    properties: {
      files: {
        type: 'array',
        items: {
          type: 'string',
          format: 'binary',
        },
        description: '支持多文件上传',
      },
    },
    required: ['files'],
  })
  @auth()
  async upload(ctx: Context) {
    try {
      const files = ctx.request.files
      let fileList: File[] = []
      Object.keys(files).forEach((key) => {
        fileList = fileList.concat(files[key])
      })

      validateFiles(fileList, {
        maxCount: 5,
        maxSize: 10 * 1024 * 1024,
        allowedTypes: ['image/png', 'image/jpeg', 'application/pdf', 'application/zip'],
      })

      const result = await uploadFile(fileList)

      ctx.body = {
        code: 200,
        result: result,
        message: '文件上传成功',
      }
    } catch (error) {
      if (ctx.request.files) {
        await cleanupTempFiles(ctx.request.files)
      }
      // 特殊错误处理
      if (error instanceof FileLimitExceededError) {
        ctx.status = 413
        ctx.body = { code: 413, error: error.message }
      } else if (error instanceof InvalidFileTypeError) {
        ctx.status = 415
        ctx.body = { code: 415, error: error.message }
      } else {
        ctx.status = 500
        ctx.body = { code: 500, error: '文件上传服务不可用' }
      }
    }
  }
}

// 临时文件清理函数
async function cleanupTempFiles(files: any) {
  const fileList = Array.isArray(files) ? files : [files]
  await Promise.all(
    fileList.map(async (file) => {
      if (file.filepath) {
        await fs.promises.unlink(file.filepath).catch(() => {})
      }
    })
  )
}
