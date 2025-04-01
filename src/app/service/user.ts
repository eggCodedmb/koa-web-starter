import type { Context } from 'koa'
import type { IUserModel } from '../model/user'
import { User } from '../model'
import { Paging } from '../dto/base'
import { decodeToken } from '~/core/auth'
import { createOneVip } from '../service/vip'
import SequelizeClient from '~/core/database'

export const createOne = async (newOne: IUserModel): Promise<User> => {
  const t = await SequelizeClient.startTransaction()
  try {
    const hashUser = await User.findOne({
      where: { username: newOne.username },
      transaction: t,
    })

    if (hashUser) {
      global.UnifyResponse.parameterException(10409)
    }
    const user = await User.create(newOne, { transaction: t })
    await createOneVip(user.id, t)
    await t.commit()
    return user
  } catch (error) {
    await t.rollback()
    global.Logger.error(error)
    throw error
  }
}

export const updateUser = async (key: string, newOne: IUserModel) => {
  const res = await User.update(newOne, { where: { id: key } })
  return res
}

export const updatePasswordByUserName = async (
  username: string,
  password: string
): Promise<User> => {
  const one = await User.findByPk(username)
  if (!one) {
    global.UnifyResponse.notFoundException(10404)
  }
  return await one!.update({ password })
}

export const getById = async (id: number): Promise<User> => {
  const one = await User.findByPk(id)
  if (!one) {
    global.UnifyResponse.notFoundException(10404)
  }
  return one!
}

export const getOneByUsername = async (username: string): Promise<User> => {
  const res = await User.findOne({ where: { username } })
  return res!
}

export const getUserInfo = async (user: { id?: string; username: string }): Promise<User> => {
  // 获取条件
  const { id, username } = user
  const where: Partial<{ id: string; username: string }> = {}
  Object.keys(user).forEach((key) => {
    if (user[key as keyof typeof user]) {
      where[key as keyof typeof where] = user[key as keyof typeof user]
    }
  })
  const res = await User.findOne({ where })
  if (!res) {
    global.UnifyResponse.notFoundException(10404)
  }

  return res!
}

export const deleteById = async (id: number): Promise<boolean> => {
  const numDeleted = await User.destroy({ where: { id } })
  return !!numDeleted
}

export const getList = async (param: {
  start: number
  limit: number
  order: 'ASC' | 'DESC'
  userId?: string
}): Promise<Paging<User>> => {
  const { start, limit, order, userId } = param
  const offset = (start - 1) * limit
  const where = userId ? { id: userId } : {}

  const { count, rows } = await User.findAndCountAll({
    where,
    order: [['created_at', order]],
    offset,
    limit,
  })
  return new Paging(rows, count, start, limit)
}

export const curUser = async (ctx: Context): Promise<User> => {
  const bearerToken = ctx.header.authorization
  const token = bearerToken!.split(' ')[1]
  const userId = decodeToken(token!)
  const one = await getById(userId)
  return one
}
