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
import { pagingSchema } from '~/app/dto/base'
import { passwordSchema, userSchema, userInfoSchema } from '~/app/dto/user'
import {
  createOne,
  curUser,
  deleteById,
  getById,
  getList,
  updateUser,
  getOneByUsername,
  updatePasswordByUserName,
} from '~/app/service/user'
import { encrypt, compare } from '~/core/encrypt/bcrypt'
import { generateToken } from '~/core/auth'

const tag = tags(['登录'])
@prefix('/')
export default class LoginController {
  @request('post', '/login')
  @summary('用户登录')
  @description('示例：/login')
  @tag
  @body(userSchema)
  async login(ctx: Context) {
    const { username, password } = ctx.validatedBody
    const user = await getOneByUsername(username)
    if (user) {
      const isPassword = await compare(password, user.password)
      if (!isPassword) {
        global.UnifyResponse.notFoundException(20001) // 密码错误
      }
    } else {
      global.UnifyResponse.notFoundException(20001) // 用户未找到
    }
  }
}
