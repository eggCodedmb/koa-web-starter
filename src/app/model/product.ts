import { DataTypes } from 'sequelize';
import { BaseModel, baseFields, baseOptions } from './base';

export interface IProduct {
  name: string;         // 商品名称
  description?: string; // 商品描述
  price: number;        // 商品价格
  stock: number;        // 商品库存
  category?: string;    // 商品类别（可选）
  imageUrl?: string;    // 商品图片URL（可选）
  brand?: string;       // 商品品牌（可选）
}

export default class Product extends BaseModel<IProduct, IProduct> {}

// 初始化 Product 模型
Product.init(
  {
    ...baseFields,
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: '商品名称',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '商品描述',
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '商品价格',
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,  // 默认库存为0
      comment: '商品库存',
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: '商品类别',
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '商品图片URL',
    },
    brand: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: '商品品牌',
    },
  },
  {
    tableName: 'products', // 设置表名
    ...baseOptions,       // 基本选项
  }
);
