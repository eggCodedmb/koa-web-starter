import { DataTypes } from 'sequelize'
import type { IBaseModel } from './base'
import { BaseModel, baseFields, baseOptions } from './base'

export interface IUserModel extends IBaseModel {
  username: string
  password: string
  nickname: string
}

export default class User extends BaseModel<IUserModel, IUserModel> {
}

User.init(
  {
    ...baseFields,
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: 'user',
    ...baseOptions,
  },
)
