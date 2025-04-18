import log4js from 'log4js'
import { isArray, isPlainObject } from '../tool'
import logConfig from './log-config'
import CONFIG from '~/config'
import { createLog } from '~/app/service/log'

const ENV = CONFIG.ENV

// loading log config
log4js.configure(logConfig)

const infoLogger = log4js.getLogger('info')
const errorLogger = log4js.getLogger('error')

// format log text
const formatText = {
  // request log
  request: function (ctx: any) {
    let logText = ''
    logText += `\n==================== REQUEST BEGIN ====================`
    logText += `\n[REQUEST LOG BEGIN]`
    logText += `\n  [requestOriginalUrl]: ${ctx.originalUrl},`
    logText += `\n  [requestIP]: ${ctx.ip},`
    logText += `\n  [requestAPI]: ${ctx.url},`
    logText += `\n  [requestMethod]: ${ctx.method},`
    logText += `\n  [requestParameters]: ${JSON.stringify(ctx.data)}`
    logText += `\n[REQUEST LOG END]\n`
    if (ENV === 'development') console.log(logText)
    return logText
  },

  // response log
  response: function (ctx: any, data?: any) {
    let logText = ''
    logText += `\n[RESPONSE LOG BEGIN]`
    logText += `\n  [responseData]: ${JSON.stringify(data)}`
    logText += `\n[RESPONSE LOG END]`
    logText += `\n******************** RESPONSE END ********************\n`
    if (ENV === 'development') console.log(logText)
    return logText
  },

  // sql query
  query: async function (sql: any, data?: any) {
    let logText = ''
    if (data && isArray(data)) data = JSON.stringify(data)
    logText += `\n[SQL QUERY LOG BEGIN]`
    logText += `\n  [SQL]: ${sql}`
    logText += `\n  [SQLData]: ${data}`
    logText += `\n[SQL QUERY LOG END]\n`
    if (ENV === 'development') console.log(logText)
    return logText
  },

  // 错误日志
  error: function (...arg: any) {
    let logText = ''
    logText += `\n!!!!!!!!!!!!!!!!!!!! ERROR LOG BEGIN !!!!!!!!!!!!!!!!!!!!`
    for (let i = 0, len = arg.length; i < len; i++) {
      let info = arg[i]
      if (isPlainObject(info)) info = JSON.stringify(info)
      logText += `\n  [errorInfoLog]: ${info}`
      console.log(info)
    }
    logText += `\n!!!!!!!!!!!!!!!!!!!! ERROR LOG END !!!!!!!!!!!!!!!!!!!!\n`

    createLog({
      logType: 'error',
      content: logText,
    })
    return logText
  },

  // info log
  info: function (message: string, extra?: any) {
    let logText = `\n[INFO LOG BEGIN]`
    logText += `\n  [message]: ${message}`
    if (extra) {
      logText += `\n  [extra]: ${JSON.stringify(extra)}`
    }
    logText += `\n[INFO LOG END]\n`
    if (ENV === 'development') console.log(logText)
    return logText
  },
}

export interface LoggerOptions {
  request: Function
  response: Function
  query: Function
  error: Function
  info: Function
  [x: string]: any
}

export const Logger: LoggerOptions = {
  /** request log */
  request: function (ctx: any) {
    if (ctx.request.url.startsWith('/favicon')) return
    infoLogger.info(formatText.request(ctx))
  },

  /** response log */
  response: function (ctx: any, data?: any) {
    if (ctx.request.url.startsWith('/favicon')) return
    infoLogger.info(formatText.response(ctx, data))
  },

  /** sql query log */
  query: function (sql: any, data?: any) {
    infoLogger.info(formatText.query(sql, data))
  },

  /** sql error log */
  error: function (...arg: any) {
    errorLogger.error(formatText.error(...arg))
  },

  /** info log */
  info: function (message: string, extra?: any) {
    infoLogger.info(formatText.info(message, extra))
  },
}
