/* eslint-disable no-var */
import type { UnifyResponse } from '../core/exception/unify-response'

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
