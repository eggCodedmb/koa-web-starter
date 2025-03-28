import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import type { Context } from 'koa'
import CONFIG from '~/config'

const CUR_REQUEST_METHOD = 'CUR_REQUEST_METHOD'

type Cache = Record<string, unknown>
const cache: Cache = {}
const JWT_KEY: string = CONFIG.SECRET.JWT_KEY //安全密钥
const EXPIRES_IN = CONFIG.SECRET.EXPIRES_IN //过期时间

// 新增用户信息类型
interface AuthUser {
  id: string
  // 可扩展其他字段如 roles, permissions 等
}

// 增强 Koa 上下文类型
declare module 'koa' {
  interface Context {
    state: {
      user?: AuthUser
    }
  }
}

function get<T>(cache: Cache, key: string): T | undefined {
  return cache[key] as T | undefined
}
function set<T>(cache: Cache, key: string, value: T): void {
  cache[key] = value
}
function del(cache: Cache, key: string): void {
  delete cache[key]
}

export function generateToken(userId: string) {
  const token = jwt.sign({ userId }, JWT_KEY, {
    expiresIn: EXPIRES_IN,
  })
  return token
}

export function decodeToken(token: string) {
  const { payload } = jwt.decode(token, { complete: true })! as JwtPayload
  const userId = payload.userId
  return userId
}

export function verifyToken(token: string): AuthUser {
  try {
    const decoded = jwt.verify(token, JWT_KEY) as JwtPayload
    return { id: decoded.userId }
  } catch (error) {
    global.UnifyResponse.unAuthenticatedException(10401)
    throw error // 确保后续代码不会执行
  }
}

function _verifyBearerToken(ctx: Context, bearerToken?: string): AuthUser {
  if (!bearerToken) {
    global.UnifyResponse.unAuthenticatedException(10401)
  }

  const [type, token] = bearerToken!.split(' ')
  if (type !== 'Bearer' || !token) {
    global.UnifyResponse.unAuthenticatedException(10401)
  }

  const user = verifyToken(token)
  ctx.state.user = user // 用户信息存入上下文
  return user
}

export const authMiddleware = (target: any) => async (ctx: Context, next: any) => {
  const methods = Object.getOwnPropertyNames(target.prototype)
  const methodKeys = methods.map((name) => `${target.name}-${name}`)

  const curMethod = get<{ key: string; disabled: boolean }>(cache, CUR_REQUEST_METHOD)
  const needAuth = !curMethod || (methodKeys.includes(curMethod.key) && curMethod.disabled)

  if (needAuth) {
    _verifyBearerToken(ctx, ctx.header.authorization)
  }

  await next()
}

export const authAll = (target: any) => {
  const middlewares = [authMiddleware(target)]
  target.middlewares = middlewares
}

const auth =
  (disabled = true) =>
  (target: any, property: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      const ctx = args[0] as Context
      const key = `${target.constructor.name}-${property}`

      set(cache, CUR_REQUEST_METHOD, { key, disabled })

      if (disabled) {
        _verifyBearerToken(ctx, ctx.header.authorization)
      }

      return originalMethod.apply(this, args)
    }

    return descriptor
  }

export default auth
