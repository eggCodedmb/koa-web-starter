import type { Context } from 'koa'
import { body, description, prefix, request, summary, tags } from 'koa-swagger-decorator'
import { textImgSchema } from '~/app/dto/texelToimg'
import Http from '~/utils/request'

const tag = tags(['文生图'])
@prefix('/v1')
export default class TextToImgController {
  @request('post', '/text2img')
  @summary('create a task')
  @description('example: /text2img')
  @tag
  @body(textImgSchema)
  public async createTask(ctx: Context): Promise<void> {
    const params = ctx.request.body
    const data = await Http.post('/v1/text2img', params, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(data)
    ctx.body = {
      code: 200,
      message: 'success',
      result: data,
    }
  }
}
