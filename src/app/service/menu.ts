import { Menu, Role, RoleMenu } from '~/app/model'
import type { IMenuModel } from '~/app/model/menu'
import { Op } from 'sequelize'

// 创建菜单业务
export const createMenu = async (menu: IMenuModel) => {
  await Menu.create(menu) // 创建菜单
}

// 获取菜单列表
export const getMenuList = async (roleIds: Array<string>) => {
  const menus = await RoleMenu.findAll({
    where: {
      roleId: {
        [Op.in]: roleIds,
      },
    },
    include: [
      {
        model: Menu,
      },
    ],
  })

  return menus
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
