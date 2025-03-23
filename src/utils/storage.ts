import nodePersist from 'node-persist'
import path from 'path'
import fs from 'fs'

type StorageOptions = {
  dir?: string
  ttl?: number
}

export class SimpleStorage {
  private storage = nodePersist.create()
  private options: StorageOptions

  constructor(options: StorageOptions = {}) {
    const defaultDir = path.resolve(__dirname, '../public/storage')
    if (!fs.existsSync(defaultDir)) {
      fs.mkdirSync(defaultDir, { recursive: true })
    }

    this.options = {
      dir: defaultDir,
      ...options,
    }
  }

  async init(): Promise<void> {
    try {
      await this.storage.init({
        dir: this.options.dir,
        ttl: this.options.ttl,
      })
      console.log('✅ Storage')
    } catch (error) {
      console.error('❌ Storage', error)
      throw error
    }
  }

  // 存储数据
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.storage.setItem(key, value, ttl ? { ttl } : undefined)
  }

  // 获取数据
  async get<T>(key: string): Promise<T | null> {
    return (await this.storage.getItem(key)) || null
  }

  // 删除数据
  async del(key: string): Promise<void> {
    await this.storage.removeItem(key)
  }

  // 清空存储
  async clear(): Promise<void> {
    await this.storage.clear()
  }
}
