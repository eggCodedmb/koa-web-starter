import type { Context } from 'koa'
import { body, description, prefix, request, summary, tags } from 'koa-swagger-decorator'
import auth, { authAll } from '~/core/auth'
import { uploadFile, validateFiles, File } from '~/utils/locaUpload'
import { FileLimitExceededError, InvalidFileTypeError } from '~/core/exception/fileErrors'
import CONFIG from '~/config'

const tag = tags(['文件上传'])

@prefix('/file')
@authAll // 需要登录
export default class UploadController {
  @request('post', '/upload')
  @summary('安全文件上传接口')
  @description(`
    支持多文件上传，文件大小限制为10MB，文件类型限制为png、jpg、pdf、zip
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
      
      if (!files) {
        return (ctx.body = {
          code: 400,
          message: '请上传文件',
        })
      }
      Object.keys(files).forEach((key) => {
        fileList = fileList.concat(files[key])
      })

      const allowedTypes = CONFIG.UPLOADFILE.TYPE
      const maxCount = CONFIG.UPLOADFILE.MAXCOUNT
      const maxSize = CONFIG.UPLOADFILE.MAXSIZE
      await validateFiles(fileList, {
        maxCount,
        maxSize,
        allowedTypes,
      })

      const result = await uploadFile(fileList)

      ctx.body = {
        code: 200,
        result: result,
        message: '文件上传成功',
      }
    } catch (error) {
      if (error instanceof FileLimitExceededError) {
        ctx.status = 413
        ctx.body = { code: 413, message: error.message }
      } else if (error instanceof InvalidFileTypeError) {
        ctx.status = 415
        ctx.body = { code: 415, message: error.message }
      } else {
        ctx.status = 500
        ctx.body = { code: 500, message: '文件上传服务不可用' }
      }
    }
  }
}
