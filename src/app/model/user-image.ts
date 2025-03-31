import { DataTypes } from 'sequelize'
import { BaseModel, baseOptions } from './base'

export interface IUserImageMode {
  imageId: string
  userId: string
}

export default class UserImage extends BaseModel<IUserImageMode, IUserImageMode> {}

UserImage.init(
  {
    imageId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '图片ID',
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '用户ID',
    },
  },
  {
    tableName: 'user_image',
    ...baseOptions,
  }
)
