import { UnifyResponse } from './exception/unify-response'
import { Logger } from '../core/log'
class InitGlobal {
  constructor() {}
  init() {
    global.UnifyResponse = new UnifyResponse()
    global.SUCCESS_CODE = 0
    global.Logger = Logger
  }
}

export default new InitGlobal()
