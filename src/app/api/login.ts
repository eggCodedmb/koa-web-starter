import type { Context } from 'koa'
import {
  body,
  description,
  path,
  prefix,
  query,
  request,
  security,
  summary,
  tags,
} from 'koa-swagger-decorator'
import { getOneByUsername, getUserInfo } from '~/app/service/user'
import { encrypt, compare } from '~/core/encrypt/bcrypt'
import { generateToken } from '~/core/auth'
import { loginSchema } from '~/app/dto/user'

const tag = tags(['登录'])
export default class LoginController {
  @request('post', '/login')
  @summary('用户登录')
  @description('示例：/login')
  @security([{ api_key: [] }])
  @tag
  @body(loginSchema)
  async login(ctx: Context) {
    const { username, password } = ctx.validatedBody
    const res = await getUserInfo(username)
    if (!res) return global.UnifyResponse.notFoundException(20001)
    const isPassword = await compare(password, res.dataValues.password)
    if (!isPassword) return global.UnifyResponse.notFoundException(20002)
    ctx.body = {
      code: global.SUCCESS_CODE,
      message: '登录成功',
      result: {
        user: res.dataValues,
        token: generateToken(res.id),
      },
    }
  }
}
