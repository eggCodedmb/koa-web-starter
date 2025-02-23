import { DataTypes } from 'sequelize';
import { BaseModel, baseFields, baseOptions } from './base';

export interface IPermissionModel {
  name: string; // 权限的名称
  description?: string; // 权限描述
  type: string; // 权限类型，可能是菜单项、按钮等
  value: string; // 权限的唯一值，通常是某个具体操作的标识符
}

export default class Permission extends BaseModel<IPermissionModel, IPermissionModel> {}

Permission.init(
  {
    ...baseFields,
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: '权限名称',
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '权限描述',
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: '权限类型，菜单或按钮等',
    },
    value: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      comment: '唯一标识符',
    },
  },
  {
    tableName: 'permission',
    ...baseOptions,
  }
);
