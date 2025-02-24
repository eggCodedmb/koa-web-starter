import { Context } from 'koa'
import { body, description, path, prefix, request, summary, tags, query } from 'koa-swagger-decorator'
import { MenuSchemaProps, MenuSchemaQueryProps } from '~/app/dto/menu'
import { createMenu, getMenuList, getMenuAll } from '~/app/service/menu'
const tag = tags(['菜单管理'])
@prefix('/menu')
export default class menuController {
  // 创建菜单
  @request('post', '/create')
  @summary('创建菜单')
  @tag
  @description('创建菜单')
  @body(MenuSchemaProps)
  public static async createMenu(ctx: Context) {
    await createMenu(ctx.validatedBody)
    global.UnifyResponse.createSuccess({ message: '创建成功' })
  }

  // 获取菜单
  @request('get', '/get')
  @summary('获取菜单')
  @tag
  @description('获取菜单')
  @query(MenuSchemaQueryProps)
  public static async getMenu(ctx: Context) {
    const { roleIds } = ctx.validatedQuery
    const menus = await getMenuList(roleIds)
    ctx.body = {
      code: 0,
      message: '获取成功',
      result: menus,
    }
  }

  // 删除菜单
  @request('delete', '/delete')
  @summary('删除菜单')
  @tag
  @description('删除菜单')
  public static async deleteMenu(ctx: Context) {}

  // 更新菜单
  @request('put', '/update')
  @summary('更新菜单')
  @tag
  @description('更新菜单')
  @body({
    id: {
      type: 'string',
      required: true,
      description: '菜单id',
      format: 'uuid',
    },
    ...MenuSchemaProps,
  })
  public static async updateMenu(ctx: Context) {}

  /**
   * 获取所有菜单
   * @param ctx
   */
  @request('get', '/all')
  @summary('获取所有菜单')
  @tag
  @description('获取所有菜单')
  public static async getMenuAll(ctx: Context) {
    const menus = await getMenuAll()
    ctx.body = {
      code: 0,
      message: '获取成功',
      result: menus,
    }
  }
}
