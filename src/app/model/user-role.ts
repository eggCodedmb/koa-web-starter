import { DataTypes } from 'sequelize'
import { BaseModel, baseOptions } from './base'
export interface IRole {
  userId: string
  roleId: string
}

export default class UserRole extends BaseModel<IRole, IRole> {
  [x: string]: any
}

UserRole.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '用户ID',
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '角色ID',
    },
  },
  {
    tableName: 'user_role',
    ...baseOptions,
  }
)
