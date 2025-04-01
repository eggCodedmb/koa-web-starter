import { SDModel } from '~/app/model'

// 获取所有模型列表
export const getSDModelList = async (): Promise<SDModel[]> => {
  const res = await SDModel.findAll()
  return res
}

export const createSDModel = async (newOne: {
  label: string
  value: string
  image: string
}): Promise<SDModel> => {
  const res = await SDModel.create(newOne)
  return res
}

export const updateSDModelById = async (
  id: string,
  newOne: { label: string; value: string; image: string }
): Promise<any> => {
  const res = await SDModel.update(newOne, { where: { id } })
  return res
}



export const deleteSDModelById = async (id: string): Promise<any> => {
  const res = await SDModel.destroy({ where: { id } })
  return res 
}
