import { DataTypes } from 'sequelize';
import { BaseModel, baseFields, baseOptions } from './base';

export interface IMenuModel {
  name: string;
  path: string;
  icon?: string;
  parentId?: string; // 父菜单ID，用于实现菜单层级结构
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
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '菜单图标',
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: '父级菜单ID',
    },
  },
  {
    tableName: 'menu',
    ...baseOptions,
  }
);
