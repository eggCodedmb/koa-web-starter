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
import { passwordSchema, userSchema } from '~/app/dto/user'
import {
  createOne,
  curUser,
  deleteById,
  getById,
  getList,
  getPage,
  updateOne,
  getOneByUsername,
  updatePasswordByUserName,
} from '~/app/service/user'
import { getVIPById } from '~/app/service/vip'
import auth, { authAll } from '~/core/auth'
import { encrypt, compare } from '~/core/encrypt/bcrypt'
import { generateToken } from '~/core/auth'

const tag = tags(['用户管理'])

@prefix('/user')
@authAll
export default class UserController {
  @request('post', '/login')
  @summary('用户登录')
  @description('示例：/user/login')
  @tag
  @body(userSchema)
  @auth(false)
  async login(ctx: Context) {
    const { username, password } = ctx.validatedBody
    const user = await getOneByUsername(username)
    if (!user) return global.UnifyResponse.notFoundException(20001) // 用户未找到
    const isPassword = await compare(password, user.password)
    if (!isPassword) return global.UnifyResponse.notFoundException(20001) // 密码错误
    const token = generateToken(user.id)
    ctx.body = {
      code: global.SUCCESS_CODE,
      message: '登录成功',
      result: {
        user,
        token,
      },
    }
  }

  @request('get', '/me')
  @summary('获取当前用户信息')
  @description('示例：/user/me')
  @tag
  @security([{ api_key: [] }])
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
  @auth()
  async list(ctx: Context) {
    const list = await getList()
    ctx.body = { list }
    ctx.body = {
      code: global.SUCCESS_CODE,
      message: '获取成功',
      result: {
        list,
      },
    }
  }

  @request('get', '/page')
  @summary('分页获取用户')
  @description('示例：/user/page')
  @tag
  @query(pagingSchema)
  @auth()
  async page(ctx: Context) {
    const paging = await getPage(ctx)
    ctx.body = {
      code: global.SUCCESS_CODE,
      message: '获取成功',
      result: {
        paging,
      },
    }
  }

  @request('post', '/register')
  @summary('创建用户')
  @description('示例：/register')
  @tag
  @security([{ api_key: [] }])
  @body(userSchema)
  async create(ctx: Context) {
    const user = ctx.validatedBody
    user.password = await encrypt(user.password)
    await createOne(user)
    global.UnifyResponse.createSuccess({ code: global.SUCCESS_CODE, message: '注册成功' })
  }

  @request('put', '')
  @summary('修改用户信息')
  @description('示例：/user')
  @tag
  @security([{ api_key: [] }])
  @body(passwordSchema)
  @auth()
  async update(ctx: Context) {
    const user = ctx.validatedBody
    await updateOne(user)
    global.UnifyResponse.updateSuccess({ code: global.SUCCESS_CODE, message: '修改成功' })
  }

  @request('post', '/password')
  @summary('修改用户密码')
  @tag
  @security([{ api_key: [] }])
  @body({})
  async updatePassword(ctx: Context) {
    let { username, oldPassword, newPassword } = ctx.validatedBody

    const { password, ...res } = await getOneByUsername(username)

    if (!password) return global.UnifyResponse.notFoundException(20001) // 用户未找到
    const isPassword = await compare(oldPassword, password)
    if (!isPassword) return global.UnifyResponse.notFoundException(20001) // 密码错误
    const hashPassword = await encrypt(newPassword)
    await updatePasswordByUserName(username, hashPassword)
    global.UnifyResponse.updateSuccess({ code: global.SUCCESS_CODE, message: '修改成功' })
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
