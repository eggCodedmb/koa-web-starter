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
import { randomId } from '~/utils/index'
import auth, { authAll, decodeToken } from '~/core/auth'

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
    id_live_preview: {
      type: 'number',
      required: false,
      description: '是否实时预览',
    },
  })
  @auth()
  public async getProgress(ctx: Context): Promise<void> {
    const { id_live_preview } = ctx.request.body
    const token = ctx.header.authorization?.slice(7) || ''
    const userId = decodeToken(token)
    const taskId = await global.storage.get(userId)

    const params = {
      task_id: taskId,
      id_live_preview: id_live_preview || 0,
    }
    console.log(params)

    const res = await Http.post('/internal/progress', params)
    ctx.body = {
      code: 200,
      message: 'success',
      result: {
        ...res,
      },
    }
  }
}
