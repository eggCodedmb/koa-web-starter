import type { Context } from 'koa'
import {
  body,
  description,
  prefix,
  request,
  summary,
  tags,
  query,
  params,
  path,
} from 'koa-swagger-decorator'
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
    const data = ctx.request.body

    const res = await Http.post('/v1/text2img', data)
    ctx.body = res
  }

  @request('get', '/progress')
  @summary('get task progress')
  @description('example: /v1/progress?skip_current_image=true')
  @tag
  @path({
    skip_current_image: { type: 'boolean', required: false, default: false },
  })
  public async testTask(ctx: Context): Promise<void> {
    const skip_current_image = ctx.validatedParams
    const res = await Http.get('/v1/progress', skip_current_image)
    ctx.body = res
  }
}
