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
import { textImgSchema } from '~/app/dto/txtToImg'
import Http from '~/utils/request'
import { base64ToFile } from '~/utils/base64ToFile'

const tag = tags(['文生图'])
@prefix('/v1')
export default class TextToImgController {
  @request('post', '/txt2img')
  @summary('create task')
  @description('example: /txt2img')
  @tag
  @body(textImgSchema)
  public async createTask(ctx: Context): Promise<void> {
    const data = ctx.request.body
    const res = await Http.post('/sdapi/v1/txt2img', data)
    const imgs = res.images
    const force_task_id = res.force_task_id
    const imgUrls = []
    for (const base64 of imgs) {
      imgUrls.push(base64ToFile(base64))
    }
    ctx.body = {
      code: 200,
      message: 'success',
      result: {
        imgUrls,
        force_task_id,
      },
    }
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
    const res = await Http.get('/sdapi/v1/progress', skip_current_image)
    ctx.body = res
  }
}
