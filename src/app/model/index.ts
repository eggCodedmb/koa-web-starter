import User from './user'
import Membership from './membership'
import Order from './order'
import OrderItem from './orderItem'
import Product from './product'

// 关联关系：一个用户有一个会员信息
User.hasOne(Membership, { foreignKey: 'userId' })
Membership.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(Order, {
  foreignKey: 'userId', // 外键字段
  sourceKey: 'id', // 源字段
  onDelete: 'CASCADE',
})

// 订单和订单项的一对多关系
Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  sourceKey: 'id',
  onDelete: 'CASCADE', 
})

// 商品和订单项的一对多关系
Product.hasMany(OrderItem, {
  foreignKey: 'productId', 
  sourceKey: 'id',
  onDelete: 'CASCADE', 
})

export { User, Membership }
