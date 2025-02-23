import { DataTypes } from 'sequelize';
import { BaseModel, baseFields, baseOptions } from './base';

export interface IRoleModel {
  name: string;
  description?: string;
}

export default class Role extends BaseModel<IRoleModel, IRoleModel> {}

Role.init(
  {
    ...baseFields,
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      comment: '角色名称',
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: '角色描述',
    },
  },
  {
    tableName: 'role',
    ...baseOptions,
  }
);
