import type { SchemaProps } from './base'

export const MenuSchemaProps: SchemaProps = {
  name: {
    type: 'string',
    required: true,
    description: '菜单名称',
  },
  path: {
    type: 'string',
    required: true,
    description: '路由路径',
  },
  icon: {
    type: 'string',
    required: true,
    description: '菜单图标',
  },
  component: {
    type: 'string',
    required: true,
    description: '菜单组件',
  },
  order: {
    type: 'number',
    required: true,
    description: '菜单排序',
  },
  parentId: {
    type: 'string',
    format: 'uuid',
    description: '父级菜单ID',
    required: false,
  },
  hideInMenu: {
    type: 'boolean',
    required: false,
    description: '是否在菜单中隐藏',
  },
  type: {
    type: 'string',
    required: true,
    description: '菜单类型',
    enum: ['menu', 'button'],
  },
}

export const MenuSchemaQueryProps: SchemaProps = {
  roleIds: {
    type: 'array',
    required: true,
    items: {
      type: 'string',
      format: 'uuid',
      description: '角色ID',
    },
  },
}
