import { DataTypes } from 'sequelize'
import type { IBaseModel } from './base'
import { BaseModel, baseFields, baseOptions } from './base'

export interface IGeneratedImage extends IBaseModel {
  userId?: string
  imageUrl: string
  prompt: string
  negativePrompt?: string
  seed?: number
  steps?: number
  cfgScale?: number
  width?: number
  height?: number
  samplerName?: string
  modelName?: string
  additionalParams?: Record<string, any>
}

export type IGeneratedImageCreate = Omit<
  IGeneratedImage,
  keyof IBaseModel | 'createdAt' | 'updatedAt'
>

export default class GeneratedImage extends BaseModel<IGeneratedImage, IGeneratedImageCreate> {}

GeneratedImage.init(
  {
    ...baseFields,
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '关联的用户ID',
    },
    imageUrl: {
      type: DataTypes.STRING(512),
      allowNull: false,
      comment: '生成的图片URL',
    },
    prompt: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '生成图片的正向提示词',
    },
    negativePrompt: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '生成图片的负面提示词',
    },
    seed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '随机种子',
    },
    steps: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '生成步数',
    },
    cfgScale: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'CFG比例',
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '图片宽度',
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '图片高度',
    },
    samplerName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '采样器名称',
    },
    modelName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: '使用的模型名称',
    },
    additionalParams: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: '其他生成参数',
    },
  },
  {
    tableName: 'generated_image',
    ...baseOptions,
  }
)
