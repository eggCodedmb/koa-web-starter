import type { Dialect } from 'sequelize'
import { Sequelize, Transaction } from 'sequelize'
import CONFIG from '~/config'

const DATABASE = CONFIG.DATABASE

class SequelizeClient {
  private static _instance: SequelizeClient // 单例模式
  private sequelizeClient: Sequelize | null = null // 数据库连接对象
  public enableStatus: boolean = false // 是否启用数据库

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

    this.enableStatus = true // 默认启用数据库
    
    sequelizeClient
      .authenticate()
      .then((res) => {
        console.log('✅ 数据库连接成功')
        this.enableStatus = true
      })
      .catch((err) => {
        this.enableStatus = false
        sequelizeClient.close()
        console.error('无法连接到数据库', err)
      })

    this.sequelizeClient = sequelizeClient
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

  /**
   *
   * @param options
   * force: 是否强制同步，会先删除表再创建
   * alter: 是否自动修改表结构
   * logging: 是否显示日志
   * @returns
   */
  public async updateModel(options?: {
    force?: boolean // 强制同步，会先删除表再创建
    alter?: boolean // 自动修改表结构
    logging?: boolean // 是否显示日志
  }): Promise<boolean> {
    if (!this.sequelizeClient) {
      console.error('数据库未连接')
      return false
    }

    try {
      const syncOptions = {
        force: options?.force || false,
        alter: options?.alter || true,
        logging: options?.logging || false,
      }

      await this.sequelizeClient.sync(syncOptions)
      console.log('✅ 数据库模型同步完成')
      return true
    } catch (error) {
      console.error('❌ 数据库模型同步失败:', error)
      return false
    }
  }

  // 通过事务暴露transaction方法
  public async startTransaction(): Promise<Transaction> {
    if (!this.sequelizeClient) {
      throw new Error('数据库未连接')
    }
    return await this.sequelizeClient.transaction()
  }
}

export default SequelizeClient.getInstance()
