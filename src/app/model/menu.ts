import { DataTypes } from 'sequelize'
import { BaseModel, baseFields, baseOptions } from './base'

export interface IMenuModel {
  id: string
  name: string
  path: string
  icon?: string
  component: string
  hideInMenu: boolean
  parentId?: string
  order?: number
  type?: 'menu' | 'button'
}

export interface MenuTree extends IMenuModel {
  children?: MenuTree[]
}

export default class Menu extends BaseModel<IMenuModel, IMenuModel> {}

Menu.init(
  {
    ...baseFields,
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '菜单名称',
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: '菜单路径',
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '菜单图标',
    },
    component: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '菜单组件',
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: '父级菜单ID',
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '菜单排序',
      defaultValue: 0,
    },
    type: {
      type: DataTypes.ENUM('menu', 'button'),
      allowNull: true,
      comment: '菜单类型，menu为菜单，button为按钮',
      defaultValue: 'menu',
    },
    hideInMenu: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: '是否在菜单中隐藏',
      defaultValue: false,
    },
  },
  {
    tableName: 'menu',
    ...baseOptions,
  }
)
