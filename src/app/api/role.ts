import { Context } from 'koa'
import { body, description, path, prefix, request, summary, tags } from 'koa-swagger-decorator'
import { assignRolesToUser, getRolesByUserId, createRole } from '~/app/service/role'
import { userRoleSchema, roleSchema } from '~/app/dto/role'
import auth from '~/core/auth'

const tag = tags(['role'])

@prefix('/user')
export default class UserRoleController {
  // 创建角色
  @request('post', '/create')
  @summary('创建角色')
  @description('创建一个新的角色')
  @tag
  @body(roleSchema)
  @auth()
  async createRole(ctx: Context) {
    // 调用创建角色的服务
    const role = await createRole(ctx.validatedBody)
    ctx.body = { result: role }
  }

  @request('post', '/roles')
  @summary('为用户分配角色')
  @description('为用户分配一个或多个角色')
  @tag
  @body(userRoleSchema)
  @auth()
  async assignRoles(ctx: Context) {
    const { roleIds,userId } = ctx.validatedBody

    // 调用为用户分配角色的服务
    await assignRolesToUser(userId, roleIds)

    // 返回成功消息
    ctx.body = { message: '成功为用户分配角色' }
  }

  @request('get', '/{userId}/roles')
  @summary('获取用户角色')
  @description('获取用户被分配的角色')
  @tag
  @path({
    userId: { type: 'string', required: true, description: 'User ID' },
  })
  async getUserRoles(ctx: Context) {
    const { userId } = ctx.validatedParams
    const roles = await getRolesByUserId(userId)
    ctx.body = { roles }
  }
}
