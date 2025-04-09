import { DataTypes } from 'sequelize'
import { BaseModel, baseOptions } from './base'

export interface IRolePermission {
  roleId: string
  permissionId: string
  menuId: string
}

export default class RolePermission extends BaseModel<IRolePermission, IRolePermission> {}

RolePermission.init(
  {
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '角色ID',
    },
    permissionId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '权限ID',
    },
    menuId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '菜单ID',
    },
  },
  {
    tableName: 'role_permission',
    ...baseOptions,
  }
)
