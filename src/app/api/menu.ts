import { Context } from 'koa'
import { body, description, path, prefix, request, summary, tags } from 'koa-swagger-decorator'
import { MenuSchemaProps } from '~/app/dto/menu'

const tag = tags(['菜单管理'])
@prefix('/menu')
export default class menuController {
  // 创建菜单
  @request('post', '/create')
  @summary('创建菜单')
  @tag
  @description('创建菜单')
  @body(MenuSchemaProps)
  public static async createMenu(ctx: Context) {}

  // 获取菜单
  @request('get', '/get')
  @summary('获取菜单')
  @tag
  @description('获取菜单')
  public static async getMenu(ctx: Context) {}

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
}
