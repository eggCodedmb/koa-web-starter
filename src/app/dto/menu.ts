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
}
