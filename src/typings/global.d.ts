/* eslint-disable no-var */
import type { UnifyResponse } from '../core/exception/unify-response'
import type { LoggerOptions } from '../core/log'
import type nodePersist from 'node-persist'

interface LoggerOptions {
  request: Function
  response: Function
  query: Function
  error: Function
  [x: string]: any
}

declare global {
  var UnifyResponse: UnifyResponse
  var SUCCESS_CODE: number
  var Logger: LoggerOptions
  var storage: nodePersist // 存储全局
}
interface UploadResult {
  originalName?: string
  fileName: string
  url: string
  size: number
  mimetype: string | null
  filePath: string
}

interface File {
  originalFilename: string | null
  size: number
  mimetype: string | null
  filepath: string
}

export { UploadResult, File }
