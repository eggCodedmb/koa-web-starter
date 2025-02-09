import { DataTypes } from 'sequelize'
import { BaseModel, baseFields, baseOptions } from './base'
import Order from './order'
import Product from './product'

export interface IOrderItem {
  orderId: string // 订单ID
  productId: string // 商品ID
  quantity: number // 商品数量
  price: number // 商品单价
  total: number // 商品总价（数量 * 单价）
}

export default class OrderItem extends BaseModel<IOrderItem, IOrderItem> {}

OrderItem.init(
  {
    ...baseFields,
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Order,
        key: 'id',
      },
      onDelete: 'CASCADE',
      comment: '订单ID',
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
      onDelete: 'CASCADE',
      comment: '商品ID',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '商品数量',
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '商品单价',
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '商品总金额（数量 * 单价）',
    },
  },
  {
    tableName: 'order_items', // 设置表名
    ...baseOptions,
  }
)
