import { DataTypes, Model,UUIDV4 } from 'sequelize'
import sequelizeClient from '~/core/database'

export interface IBaseModel {
  id?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}
// 继承Model<T, C>，T是模型的属性，C是模型的创建属性
export class BaseModel<T extends Object, C extends Object> extends Model<T, C> {
  declare id: string
  declare created_at: Date
  declare updated_at: Date
  declare deleted_at: Date
}

export const baseOptions = {
  sequelize: sequelizeClient.config(),
  paranoid: true,
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
}

export const baseFields = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
  deleted_at: {
    type: DataTypes.DATE,
  },
}
