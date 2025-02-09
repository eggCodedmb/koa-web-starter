import { DataTypes } from 'sequelize'
import type { IBaseModel } from './base'
import { BaseModel, baseFields, baseOptions } from './base'
import User from './user'

export interface IOrder extends IBaseModel {
  userId: string // 用户ID
  amount: number // 订单金额
  status: number // 订单状态
  paymentMethod: number // 支付方式: 0:微信,1:支付宝
  orderNumber: string //订单号
}

export default class Order extends BaseModel<IOrder, IOrder> {}

Order.init(
  {
    ...baseFields,
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
      comment: '用户id',
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '订单总金额',
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '订单状态: 0:未支付,1:已支付,2:已关闭',
    },
    paymentMethod: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '支付方式: 0:微信,1:支付宝',
    },
    orderNumber: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: '订单号',
    },
  },
  {
    tableName: 'orders',
    ...baseOptions,
  }
)
