import { DataTypes } from 'sequelize'
import { BaseModel, baseOptions } from './base'
import { IBaseModel } from './base'

export interface ISDModel extends IBaseModel {
  label: string
  value: string
  image: string
}

export type ISDModelCreate = Omit<
  ISDModel,
  keyof IBaseModel | 'createdAt' | 'updatedAt' | 'deletedAt'
>


export default class SDModel extends BaseModel<ISDModel, ISDModelCreate> {}

SDModel.init(
  {
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '模型名称',
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '模型值',
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: false,
      comment: '模型图片',
    },
  },
  {
    tableName: 'sd_model',
    ...baseOptions,
  }
)
