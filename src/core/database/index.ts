import type { Dialect } from 'sequelize'
import { Sequelize, Transaction } from 'sequelize'
import CONFIG from '~/config'

const DATABASE = CONFIG.DATABASE

class SequelizeClient {
  private static _instance: SequelizeClient // 单例模式
  private sequelizeClient: Sequelize | null = null // sequelize客户端
  public enableStatus: boolean = false // 是否启用

  private constructor() {
    const sequelizeClient = new Sequelize(DATABASE.DB_NAME, DATABASE.USER, DATABASE.PASSWORD, {
      dialect: DATABASE.DIALECT as Dialect, // 数据库类型
      host: DATABASE.HOST,
      port: DATABASE.PORT,
      dialectOptions: {
        // 数据库连接选项
        dateStrings: true, // 将日期字符串转换为 Date 对象
        typeCast: true, // 将字段类型转换为 JavaScript 类型
      },
      timezone: DATABASE.TIMEZONE, // 时区
      logging: false, // 是否打印sql
    })
    sequelizeClient
      .authenticate()
      .then((res) => {
        this.enableStatus = true
        console.log('Message:数据库连接成功')
      })
      .catch((err) => {
        this.enableStatus = false
        sequelizeClient.close()
        console.error('无法连接到数据库', err)
      })

    this.sequelizeClient = sequelizeClient
    // 同步模型
    this.syncModel()
  }

  public static getInstance() {
    if (!this._instance) {
      SequelizeClient._instance = new SequelizeClient()
    }
    return SequelizeClient._instance
  }

  public config() {
    return this.sequelizeClient!
  }

  public enable() {
    return this.enableStatus
  }

  // 同步模型
  public async syncModel() {
    await this.sequelizeClient?.sync({ alter: true })
    console.log('同步所有模型')
  }

  // 通过事务暴露transaction方法
  public async startTransaction(): Promise<Transaction> {
    if (!this.sequelizeClient) {
      throw new Error('Sequelize client is not initialized')
    }
    return await this.sequelizeClient.transaction()
  }
}

export default SequelizeClient.getInstance()
