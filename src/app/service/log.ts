import Log from '../model/log'
import type { ILogModel } from '../model/log'
import type { Context } from 'koa'
import { Paging } from '../dto/base'
// 保存日志
export const createLog = async (data: ILogModel):Promise<void> => {
  await Log.create(data)
}
// 获取日志
export const getLog = async (ctx: Context): Promise<Paging<Log>> => {
  const start = ctx.validatedQuery.start
  const limit = ctx.validatedQuery.limit
  const offset = (start - 1) * limit

  // 使用并发请求优化数据库访问
  const [pageRel, totalRel] = await Promise.all([Log.findAll({ offset, limit }), Log.count()])

  // 返回分页后的日志数据
  return new Paging(pageRel, totalRel, start, limit)
}

// 删除日志
export const deleteLog = async (id: string) => {
  const res = await Log.destroy({
    where: {
      id,
    },
  })
  return res
}
