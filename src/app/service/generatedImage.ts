import { GeneratedImage } from '~/app/model'
import { IGeneratedImageModel } from '~/app/model/generatedImage'
import { Op } from 'sequelize'
import { Paging } from '../dto/base'

/**
 * 获取图片列表
 * @param params - 分页参数 { start: 1, limit: 10 }
 * @returns  - 分页对象 { list: [], total: 0, start: 1, limit: 10 }
 */
export const getGeneratedImageList = async (params: {
  start: number
  limit: number
}): Promise<Paging<GeneratedImage>> => {
  const { start, limit } = params
  const { count: totalRel, rows: pageRel } = await GeneratedImage.findAndCountAll({
    limit: limit, // 每页显示的数量
    offset: (start - 1) * limit, // 偏移量，用于分页
  })
  return new Paging(pageRel, totalRel, start, limit)
}
/**
 * 根据id获取图片
 * @param id - 图片id
 * @returns  - 图片对象
 */
export const getGeneratedImageById = async (id: string): Promise<GeneratedImage> => {
  const res = await GeneratedImage.findByPk(id)
  if (!res) {
    global.UnifyResponse.notFoundException(10404)
  }
  return res!
}

/**
 * 创建图片
 * @param newOne - 图片对象
 * @returns  - 图片对象
 */
export const createGeneratedImage = async (
  newOne: IGeneratedImageModel
): Promise<GeneratedImage> => {
  const res = await GeneratedImage.create(newOne)
  return res
}

// 软删除
export const deleteGeneratedImageById = async (id: string): Promise<boolean> => {
  const numDeleted = await GeneratedImage.destroy({ where: { id } })
  return !!numDeleted
}

// 批量软删除
export const deleteGeneratedImageByIds = async (ids: string[]): Promise<boolean> => {
  const numDeleted = await GeneratedImage.destroy({ where: { id: { [Op.in]: ids } } })
  return !!numDeleted
}

export const updateGeneratedImageById = async (
  id: string,
  newOne: IGeneratedImageModel
): Promise<GeneratedImage> => {
  const res = await GeneratedImage.update(newOne, { where: { id } })
  return res[0] > 0 ? await getGeneratedImageById(id) : null!
}
