import type { Context } from 'koa'
import { body, description, prefix, request, summary, tags } from 'koa-swagger-decorator'
import auth, { authAll } from '~/core/auth'
import { uploadFile, validateFiles } from '~/utils/locaUpload'
import { uploadChunk, fileMerge } from '~/utils/uploadChunk'
import { FileLimitExceededError, InvalidFileTypeError } from '~/core/exception/fileErrors'
import CONFIG from '~/config'
import { File } from '~/typings/global'
const tag = tags(['文件上传'])

@prefix('/file')
export default class UploadController {
  @request('post', '/upload')
  @summary('文件上传接口')
  @description('支持多文件上传')
  @tag
  @body({})
  @auth()
  async upload(ctx: Context) {
    try {
      console.log(ctx);
      
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
        noTypeCheck: CONFIG.UPLOADFILE.NO_TYPE_CHECK,
      })

      const result = await uploadFile(fileList)
      const data = result.map((item) => {
        return {
          ...item,
          filePath: '',
        }
      })

      ctx.body = {
        code: 200,
        result: data,
        message: '文件上传成功',
      }
    } catch (error) {
      console.log(error)
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

  @request('post', '/uploadChunk')
  @summary('文件分片上传接口')
  @description('支持多文件上传')
  @body({})
  @tag
  async uploadChunk(ctx: Context) {
    try {
      console.log(ctx)

      const file = ctx.request.files?.file as File

      const path = CONFIG.UPLOADFILE.UPLOAD_TEMP

      const res = await uploadChunk(file, path)
      ctx.body = {
        code: 200,
        message: '文件分片上传成功',
        result: res,
      }
    } catch (error) {
      console.log(error)

      ctx.body = {
        code: 500,
        message: error.message,
      }
    }
  }

  @request('post', '/mergeChunk')
  @summary('文件分片合并接口')
  @description('')
  @body({})
  @tag
  async mergeChunk(ctx: Context) {
    try {
      const path = CONFIG.UPLOADFILE.UPLOAD_TEMP
      const name = ctx.request.body.name as string
      const res = await fileMerge(name, path)
      ctx.body = {
        code: 200,
        message: '文件合并成功',
        result: res,
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        message: '文件合并失败',
      }
    }
  }
}
