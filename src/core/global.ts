import { UnifyResponse } from './exception/unify-response'
import { Logger } from '../core/log'
import { SimpleStorage } from '../utils/storage'
import CONFIG from '../config'
class InitGlobal {
  constructor() {}
  init() {
    // 初始化全局变量
    global.UnifyResponse = new UnifyResponse()
    global.SUCCESS_CODE = 0
    global.Logger = Logger
    global.storage = new SimpleStorage({
      dir: CONFIG.STORAGE_DIR,
      ttl: CONFIG.STORAGE_MAX_AGE,
    })
    global.storage.init()
  }
}

export default new InitGlobal()
