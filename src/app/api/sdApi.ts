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
import { textImgSchema } from '~/app/dto/txtToImg'
import {
  getGeneratedImageList,
  createGeneratedImage,
  updateGeneratedImageById,
  getGeneratedImageById,
  deleteGeneratedImageById,
  deleteGeneratedImageByIds,
} from '~/app/service/generatedImage'

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
      code: global.SUCCESS_CODE,
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
      code: global.SUCCESS_CODE,
      message: 'success',
      result: {
        ...res,
        live_preview,
      },
    }
  }
  @request('post', '/txt2img')
  @summary('文生图')
  @description('example: /txt2img')
  @tag
  @body(textImgSchema)
  @auth()
  public async createTask(ctx: Context): Promise<void> {
    const userId = ctx.state.user?.id
    if (!userId) {
      global.UnifyResponse.unAuthenticatedException(10401)
    }
    const data = ctx.request.body
    const res = await Http.post('/sdapi/v1/txt2img', data)
    const imgUrls = []
    for (const base64 of res.images) {
      imgUrls.push(base64ToFile(base64))
    }
    const config = {
      userId: userId,
      prompt: data.prompt,
      negativePrompt: data.negative_prompt,
      imageUrl: imgUrls[0],
      seed: data.seed,
      steps: data.steps,
      cfgScale: data.cfg_scale,
      width: data.width,
      height: data.height,
      samplerName: data.sampler_name,
      additionalParams: data,
    }
    await createGeneratedImage(config)
    ctx.body = {
      code: global.SUCCESS_CODE,
      message: 'success',
      result: {
        imgUrls,
      },
    }
  }
  @request('get', '/generated-images')
  @summary('获取生成的图片列表')
  @description('example: /generated-images')
  @tag
  @query({
    start: { type: 'number', required: false, description: '分页起始位置' },
    limit: { type: 'number', required: false, description: '分页大小' },
    order: { type: 'string', required: false, description: '排序方式' },
    userId: { type: 'string', required: false, description: '用户id' },
  })
  public async getGeneratedImageList(ctx: Context): Promise<void> {
    const { start = 1, limit = 10, order = 'DESC', userId } = ctx.query as any
    const res = await getGeneratedImageList({ start, limit, order, userId })
    ctx.body = {
      code: global.SUCCESS_CODE,
      message: 'success',
      result: res,
    }
  }
}
