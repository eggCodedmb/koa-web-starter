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
import Http from '~/utils/request'
import { base64ToFile } from '~/utils/base64ToFile'
import auth from '~/core/auth'

const tag = tags(['AI绘图接口'])
@prefix('/v1')
export default class TextToImgController {
  @request('get', '/get-models')
  @summary('获取模型列表')
  @description('example: /sd-models')
  @tag
  @auth()
  public async getModels(ctx: Context): Promise<void> {
    const res = await Http.get('/sdapi/v1/sd-models')
    ctx.body = {
      code: 200,
      message: 'success',
      result: {
        models: res,
      },
    }
  }

  //获取任务进度
  @request('post', '/progress')
  @summary('获取任务进度')
  @description('example: /progress')
  @tag
  @body({
    id_task: {
      type: 'string',
      required: false,
      description: '任务id',
    },
    id_live_preview: {
      type: 'number',
      required: false,
      description: '是否实时预览',
    },
  })
  @auth()
  public async getProgress(ctx: Context): Promise<void> {
    const data = ctx.request.body
    const res = await Http.post('/internal/progress', data)

    const live_preview = base64ToFile(res.live_preview)
    ctx.body = {
      code: 200,
      message: 'success',
      result: {
        ...res,
        live_preview,
      },
    }
  }
}
