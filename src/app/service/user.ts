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

export const updateOne = async (newOne: IUserModel): Promise<User> => {
  const one = await User.findByPk(newOne.id)
  if (!one) {
    global.UnifyResponse.notFoundException(10404)
  }
  return await one!.update(newOne)
}

export const getById = async (id: number): Promise<User> => {
  const one = await User.findByPk(id)
  if (!one) {
    global.UnifyResponse.notFoundException(10404)
  }
  return one!
}

export const getOneByUsername = async (username: string): Promise<User | null> => {
  return await User.findOne({ where: { username } })
}

export const deleteById = async (id: number): Promise<boolean> => {
  const numDeleted = await User.destroy({ where: { id } })
  return !!numDeleted
}

export const getList = async (): Promise<User[]> => {
  return await User.findAll()
}

export const getPage = async (ctx: Context): Promise<Paging<User>> => {
  const { start, limit } = ctx.validatedQuery
  const offset = (start - 1) * limit
  const pageRel = await User.findAll({ offset, limit })
  const totalRel = (await User.findAll()).length

  return new Paging(pageRel, totalRel, start, limit)
}

export const curUser = async (ctx: Context): Promise<User> => {
  const bearerToken = ctx.header.authorization
  const token = bearerToken!.split(' ')[1]
  const userId = decodeToken(token!)
  const one = await getById(userId)
  return one
}
