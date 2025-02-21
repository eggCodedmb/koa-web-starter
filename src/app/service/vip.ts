import type { Context } from 'koa'
import type { IMembership } from '../model/membership'
import { Membership } from '../model'
import type { Transaction } from 'sequelize'

// 创建一个会员
export const createOneVip = async (userId: string, t: Transaction): Promise<Membership> => {
  const vip = {
    userId,
    points: 0,
  } as IMembership
  const res = await Membership.create(vip, { transaction: t })
  return res!
}

// 更新一个会员
export const updateOneVip = async (newOne: IMembership): Promise<Membership> => {
  const one = await Membership.findByPk(newOne.id)
  if (!one) {
    global.UnifyResponse.notFoundException(10404)
  }
  return await one!.update(newOne)
}

// 通过ID获取一个会员
export const getVIPById = async (userId: string): Promise<Membership> => {
  const one = await Membership.findOne({ where: { userId } })
  return one!
}
