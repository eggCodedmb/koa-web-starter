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
import { pagingSchemaUser } from '~/app/dto/base'
import { passwordSchema, userSchema, userInfoSchema } from '~/app/dto/user'
import {
  createOne,
  curUser,
  deleteById,
  getList,
  updateUser,
  updatePasswordByUserName,
  getUserInfo,
} from '~/app/service/user'
import { getVIPById } from '~/app/service/vip'
import auth from '~/core/auth'
import { encrypt, compare } from '~/core/encrypt/bcrypt'

const tag = tags(['用户管理'])

@prefix('/user')
export default class UserController {
  @request('get', '/me')
  @summary('获取当前用户信息')
  @description('示例：/user/me')
  @tag
  @security([{ api_key: [] }])
  @auth()
  async me(ctx: Context) {
    const user = await curUser(ctx)
    const vip = await getVIPById(user.id)
    ctx.body = {
      code: global.SUCCESS_CODE,
      message: '获取成功',
      result: {
        user,
        vip,
      },
    }
  }

  @request('get', '/list')
  @summary('获取用户列表')
  @description('示例：/user/list')
  @tag
  @query(pagingSchemaUser)
  async list(ctx: Context) {
    const { start, limit, order = 'DESC', email, username, nickname } = ctx.validatedQuery
    const user = {
      email,
      username,
      nickname,
    }
    const res = await getList({ start, limit, order, user })
    ctx.body = {
      code: global.SUCCESS_CODE,
      message: '获取成功',
      result: {
        ...res,
      },
    }
  }

  @request('post', '/register')
  @summary('创建用户')
  @description('示例：/register')
  @tag
  @body(userSchema)
  async create(ctx: Context) {
    const user = ctx.validatedBody
    user.password = await encrypt(user.password)
    await createOne(user)
    global.UnifyResponse.createSuccess({ code: global.SUCCESS_CODE, message: '注册成功' })
  }

  @request('put', '/update')
  @summary('修改用户信息')
  @description('示例：/user/update')
  @tag
  @body(userInfoSchema)
  @auth()
  async update(ctx: Context) {
    const id = ctx.state.user?.id
    if (!id) {
      global.UnifyResponse.notFoundException(10404)
    }
    const user = ctx.validatedBody
    await updateUser(id as string, user)
    global.UnifyResponse.updateSuccess({ code: global.SUCCESS_CODE, message: '修改成功' })
  }

  @request('post', '/password')
  @summary('修改用户密码')
  @tag
  @security([{ api_key: [] }])
  @body(passwordSchema)
  @auth()
  async updatePassword(ctx: Context) {
    const { username, password, newPassword } = ctx.validatedBody
    const res = await getUserInfo(username)
    if (!res?.dataValues.username) return global.UnifyResponse.notFoundException(20001) // 用户未找到
    const isPassword = await compare(password, res?.dataValues.password)
    if (!isPassword) return global.UnifyResponse.notFoundException(20002) // 密码错误
    const hashPassword = await encrypt(newPassword)
    const id = ctx.state.user?.id
    if (id) {
      await updatePasswordByUserName(id, hashPassword)
      global.UnifyResponse.updateSuccess({ code: global.SUCCESS_CODE, message: '修改成功' })
    } else {
      global.UnifyResponse.notFoundException(20000)
      global.Logger.error('修改密码失败')
    }
  }

  @request('delete', '/{id}')
  @summary('删除用户')
  @description('示例：/user/1')
  @tag
  @security([{ api_key: [] }])
  @path({
    id: { type: 'string', required: true, default: null, description: '用户ID' },
  })
  @auth()
  async delete(ctx: Context) {
    const { id } = ctx.validatedParams
    await deleteById(id)
    global.UnifyResponse.deleteSuccess({ code: global.SUCCESS_CODE, message: '删除成功' })
  }
}
