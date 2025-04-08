import { DataTypes } from 'sequelize'
import type { IBaseModel } from './base'
import { BaseModel, baseFields, baseOptions } from './base'

export interface IUserModel extends IBaseModel {
  username: string
  password: string
  nickname: string
  email: string
  avatar?: string
}

export default class User extends BaseModel<IUserModel, IUserModel> {}

User.init(
  {
    ...baseFields,
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: {
        name: 'username_unique', // 唯一约束的名称
        msg: '用户名已存在', // 自定义错误消息
      },
      comment: '用户账号',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '用户密码',
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '用户邮箱',
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '用户名称',
      defaultValue: '用户' + Math.floor(Math.random() * 1000),
    },
    avatar: {
      type: DataTypes.STRING(512),
      allowNull: true,
      comment: '用户头像',
    },
  },
  {
    tableName: 'user',
    ...baseOptions,
  }
)
