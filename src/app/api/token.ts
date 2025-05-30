import type { Context } from 'koa'
import { body, description, prefix, request, summary, tags } from 'koa-swagger-decorator'
import { code2Session, userLogin } from '~/app/service/token'
import { LOGIN_TYPE } from '~/app/shared/enum'

const tag = tags(['身份验证'])

export const tokenSchema = {
  username: { type: 'string', required: true },
  password: { type: 'string', required: true },
  type: { type: 'number', required: true, default: 1 },
}

@prefix('/token')
export default class TokenController {
  @request('post', '')
  @summary('get token')
  @description('example: /token')
  @tag
  @body(tokenSchema)
  async getToken(ctx: Context) {
    const userData = ctx.validatedBody
    let token = ''
    switch (userData.type) {
      case LOGIN_TYPE.USER_USERNAME:
        token = await userLogin(userData)
        break
      case LOGIN_TYPE.USER_WX:
        token = await code2Session(userData)
        break
      default:
        global.UnifyResponse.parameterException(20002)
        break
    }
    ctx.body = {
      code: global.SUCCESS_CODE,
      message: 'success',
      result: { token },
    }
  }
}
