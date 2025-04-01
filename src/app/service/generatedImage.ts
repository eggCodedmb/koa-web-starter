import { GeneratedImage, User, UserImage } from '~/app/model'
import { IGeneratedImage } from '~/app/model/generatedImage'
import { Op } from 'sequelize'
import { Paging } from '../dto/base'

/**
 * 获取图片列表
 * @param params - 分页参数 { start: 1, limit: 10 }
 * @returns  - 分页对象 { items: [], total: 0, start: 1, limit: 10 }
 */
export const getGeneratedImageList = async (params: {
  start: number
  limit: number
  order?: 'DESC' | 'ASC'
  userId?: string
}): Promise<Paging<GeneratedImage>> => {
  const { start = 1, limit = 10 } = params
  const order = params.order || 'DESC'

  // 确保分页参数有效
  const validStart = Math.max(1, start)
  const validLimit = Math.max(1, Math.min(limit, 100)) // 限制最大100条

  const { count: totalRel, rows: pageRel } = await GeneratedImage.findAndCountAll({
    limit: validLimit,
    offset: (validStart - 1) * validLimit,
    order: [['created_at', order]],
    where: params.userId ? { userId: params.userId } : {},
    include: [
      {
        model: UserImage,
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'nickname', 'email', 'avatar'],
          },
        ],
      },
    ],
  })
  return new Paging(pageRel, totalRel, validStart, validLimit)
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
export const createGeneratedImage = async (newOne: IGeneratedImage): Promise<GeneratedImage> => {
  const res = await GeneratedImage.create(newOne)
  // if (res.id && newOne.userId) {
  //   await UserImage.create({ userId: newOne.userId, imageId: res.id })
  // }
  return res
}

/**
 * 根据id删除图片
 * @param id - 图片id
 * @returns  - 是否删除成功
 * */
export const deleteGeneratedImageById = async (id: string): Promise<boolean> => {
  const numDeleted = await GeneratedImage.destroy({ where: { id } })
  return !!numDeleted
}

/**
 * 根据id批量删除图片
 * @param ids - 图片id数组
 * @returns  - 是否删除成功
 */
export const deleteGeneratedImageByIds = async (ids: string[]): Promise<boolean> => {
  const numDeleted = await GeneratedImage.destroy({ where: { id: { [Op.in]: ids } } })
  return !!numDeleted
}

/**
 * 根据id更新图片
 * @param id - 图片id
 * @param newOne - 图片对象
 * @returns  - 图片对象
 */
export const updateGeneratedImageById = async (
  id: string,
  newOne: IGeneratedImage
): Promise<GeneratedImage> => {
  const res = await GeneratedImage.update(newOne, { where: { id } })
  return res[0] > 0 ? await getGeneratedImageById(id) : null!
}
