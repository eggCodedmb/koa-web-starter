import { DataTypes } from 'sequelize'
import { BaseModel, baseOptions } from './base'

export interface IRoleMenu {
  roleId: string // 角色ID
  menuId: string // 菜单ID
}

export default class RoleMenu extends BaseModel<IRoleMenu, IRoleMenu> {
}

RoleMenu.init(
  {
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '角色ID',
    },
    menuId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '菜单ID',
    },
  },
  {
    tableName: 'role_menu',
    ...baseOptions,
  }
)
