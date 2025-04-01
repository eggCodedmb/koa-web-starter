import User from './user'
import Membership from './membership'
import Order from './order'
import OrderItem from './orderItem'
import Product from './product'
import Log from './log'
import Role from './role'
import UserRole from './user-role'
import Permission from './permission'
import RolePermission from './role-permission'
import Menu from './menu'
import RoleMenu from './role-menu'
import GeneratedImage from './generatedImage'
import UserImage from './user-image'

// 关联关系：一个用户有一个会员信息
User.hasOne(Membership, { foreignKey: 'userId' })
Membership.belongsTo(User, { foreignKey: 'userId' })

// 用户与订单的关系：一个用户可以有多个订单
User.hasMany(Order, {
  foreignKey: 'userId',
  sourceKey: 'id',
  onDelete: 'CASCADE',
})

// 订单与订单项的关系：一个订单可以有多个订单项
Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  sourceKey: 'id',
  onDelete: 'CASCADE',
})

// 商品与订单项的关系：一个商品可以出现在多个订单项中
Product.hasMany(OrderItem, {
  foreignKey: 'productId',
  sourceKey: 'id',
  onDelete: 'CASCADE',
})

// 一个用户可以拥有多个角色（多对多的关系）
User.belongsToMany(Role, {
  through: UserRole, // 中间表
  foreignKey: 'userId', // 用户的外键
  otherKey: 'roleId', // 角色的外键
})
Role.belongsToMany(User, {
  through: UserRole, // 中间表
  foreignKey: 'roleId', // 角色的外键
  otherKey: 'userId', // 用户的外键
})

//一个角色可以拥有多个权限（多对多的关系）
Role.belongsToMany(Permission, {
  through: RolePermission, // 中间表
  foreignKey: 'roleId',
  otherKey: 'permissionId',
})
Permission.belongsToMany(Role, {
  through: RolePermission, // 中间表
  foreignKey: 'permissionId',
  otherKey: 'roleId',
})

// 一个角色可以拥有多个菜单（多对多的关系）
Role.belongsToMany(Menu, {
  through: RolePermission, // 通过角色-权限关联表管理菜单
  foreignKey: 'roleId',
  otherKey: 'menuId',
})
Menu.belongsToMany(Role, {
  through: RolePermission, // 通过角色-权限关联表管理菜单
  foreignKey: 'menuId',
  otherKey: 'roleId',
})

// 定义 UserRole 和 Role 之间的关联
UserRole.belongsTo(User, { foreignKey: 'userId' })
UserRole.belongsTo(Role, { foreignKey: 'roleId' })

// 定义 RolePermission 和 Role 之间的关联
RolePermission.belongsTo(Role, { foreignKey: 'roleId' })
RolePermission.belongsTo(Permission, { foreignKey: 'permissionId' })

// 定义 RolePermission 和 Menu 之间的关联
RolePermission.belongsTo(Menu, { foreignKey: 'menuId' })
RolePermission.belongsTo(Role, { foreignKey: 'roleId' })

// 定义 RolePermission 和 Permission 之间的关联
RolePermission.belongsTo(Permission, { foreignKey: 'permissionId' })
RolePermission.belongsTo(Role, { foreignKey: 'roleId' })

RoleMenu.belongsTo(Role, { foreignKey: 'roleId' })
RoleMenu.belongsTo(Menu, { foreignKey: 'menuId' })

// ai绘图
GeneratedImage.belongsToMany(User, {
  through: UserImage,
  foreignKey: 'imageId',
  otherKey: 'userId',
})

User.belongsToMany(GeneratedImage, {
  through: UserImage,
  foreignKey: 'userId',
  otherKey: 'imageId',
})

// 定义 UserImage 和 User 之间的关联
UserImage.belongsTo(GeneratedImage, { foreignKey: 'imageId' })
UserImage.belongsTo(User, { foreignKey: 'userId' })

export {
  User,
  Membership,
  Order,
  OrderItem,
  Product,
  Log,
  Role,
  UserRole,
  Permission,
  RolePermission,
  Menu,
  RoleMenu,
  GeneratedImage,
  UserImage,
}
