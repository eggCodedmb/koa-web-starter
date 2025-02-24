import { Menu, Role, RoleMenu } from '~/app/model'
import type { IRoleMenu } from '~/app/model/role-menu'
import type { IMenuModel, MenuTree } from '~/app/model/menu'
import { Op } from 'sequelize'
import { buildMenuTree } from '~/utils'

// 创建菜单业务
export const createMenu = async (menu: IMenuModel): Promise<Menu> => {
  return await Menu.create(menu) // 创建菜单
}

// 获取菜单列表
export const getMenuList = async (roleIds: Array<string>) => {
  const menuIds = await RoleMenu.findAll({
    where: {
      roleId: {
        [Op.in]: roleIds,
      },
    },
    attributes: ['menuId'],
  }) as unknown as IRoleMenu[]

  const menus = await Menu.findAll({
    where: {
      id: {
        [Op.in]: menuIds.map((menu) => menu.menuId),
      },
    },
    attributes: ['id', 'name', 'path', 'icon', 'parentId', 'component', 'hideInMenu', 'type', 'order'],
  })
  return buildMenuTree(menus.map((menu) => menu.toJSON()))
}

export const assignMenusToRole = async (roleId: string, menuIds: Array<string>) => {
  await RoleMenu.destroy({
    where: {
      roleId,
    },
  })

  await Promise.all(
    menuIds.map((menuId) => {
      return RoleMenu.create({
        roleId,
        menuId,
      })
    })
  )
}

/**
 * 获取所有菜单
 * @returns
 */
export const getMenuAll = async (): Promise<MenuTree[]> => {
  const menus = (await Menu.findAll({
    attributes: ['id', 'name', 'path', 'icon', 'parentId', 'component', 'hideInMenu', 'type'],
  })) as Menu[]
  return buildMenuTree(menus.map((menu) => menu.toJSON()))
}
