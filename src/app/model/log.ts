import { DataTypes, Optional } from 'sequelize'
import type { IBaseModel } from './base'
import { BaseModel, baseFields, baseOptions } from './base'

// 定义 ILogModel 接口，包含自动生成的字段
export interface ILogModel extends IBaseModel {
  logType: 'request' | 'error' | 'response' | 'query' | 'info'
  content: string
  ip?: string
  userId?: string
  method?: string
  url?: string
  timestamp?: Date
}

// 定义 Log 类并继承 BaseModel
export default class Log extends BaseModel<ILogModel, ILogModel> {}

// 初始化模型
Log.init(
  {
    ...baseFields,
    logType: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '日志类型',
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '日志内容',
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'ip地址',
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '用户id',
    },
    method: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '请求方法',
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '请求地址',
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '请求时间',
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'log',
    ...baseOptions, // 这里是通用的数据库配置
  }
)
