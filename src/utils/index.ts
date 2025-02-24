import type { MenuTree } from '~/app/model/menu'

/**
 * 将扁平化的菜单数组转换为树形结构
 * @param menus 扁平化的菜单数组
 * @param parentId 根节点的parentId
 * @returns 树形结构的菜单数组
 */
export const buildMenuTree = (menus: MenuTree[], parentId: string | null = null): MenuTree[] => {
  return menus
    .filter((menu) => menu.parentId === parentId)
    .map((menu) => ({
      ...menu,
      children: buildMenuTree(menus, menu.id),
    }))
}
