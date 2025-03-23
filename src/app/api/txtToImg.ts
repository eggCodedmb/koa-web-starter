import type { Context } from 'koa'
import { body, description, prefix, request, summary, tags } from 'koa-swagger-decorator'
import { textImgSchema } from '~/app/dto/txtToImg'
import Http from '~/utils/request'
import { base64ToFile } from '~/utils/base64ToFile'
import auth from '~/core/auth'

const tag = tags(['AI绘图接口'])
@prefix('/v1')
export default class TextToImgController {
  @request('post', '/txt2img')
  @summary('文生图')
  @description('example: /txt2img')
  @tag
  @body(textImgSchema)
  @auth()
  public async createTask(ctx: Context): Promise<void> {
    const data = ctx.request.body
    const res = await Http.post('/sdapi/v1/txt2img', data)
    const imgUrls = []
    for (const base64 of res.images) {
      imgUrls.push(base64ToFile(base64))
    }
    ctx.body = {
      code: 200,
      message: 'success',
      result: {
        imgUrls,
      },
    }
  }
}
