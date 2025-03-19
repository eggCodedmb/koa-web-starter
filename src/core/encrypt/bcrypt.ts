import bcrypt from 'bcrypt'

const saltRounds = 10

/**
 * 密码加密
 * @param password
 * @returns
 */
export function encrypt(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds)
}

/**
 * 密码校验
 * @param password
 * @param hash
 * @returns  true: 密码正确 false: 密码错误
 */
export function compare(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
