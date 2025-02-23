import { Role, UserRole } from '~/app/model'
import type { IRoleModel } from '~/app/model/role'

/**
 * 创建角色
 * @param data 角色数据
 */
export const createRole = async (data: IRoleModel): Promise<Role> => {
  return await Role.create(data)
}

/**
 * 为用户分配角色
 * @param userId 用户ID
 * @param roleIds 角色ID数组
 */
export const assignRolesToUser = async (userId: string, roleIds: string[]) => {
  // 先清除用户原有的角色
  await UserRole.destroy({
    where: { userId },
  })

  // 然后重新分配角色
  const userRoleData = roleIds.map((roleId) => ({
    userId,
    roleId,
  }))

  // 批量插入角色与用户的关系
  await UserRole.bulkCreate(userRoleData)
}

/**
 * 根据用户ID获取所有已分配的角色
 * @param userId 用户ID
 * @returns 角色列表
 */
export const getRolesByUserId = async (userId: string) => {
  const userRoles = await UserRole.findAll({
    where: { userId },
    include: [
      {
        model: Role,
        attributes: ['id', 'name'], // 返回角色的ID和name字段
      },
    ],
  })

  // 提取角色信息
  const roles = userRoles.map((userRole) => userRole.Role)

  return roles
}
