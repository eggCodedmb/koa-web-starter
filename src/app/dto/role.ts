import type { SchemaProps } from './base'

export const userRoleSchema: SchemaProps = {
  userId: {
    type: 'string',
    required: true,
    format: 'uuid',
  },
  roleIds: {
    type: 'array',
    required: true,
    items: { type: 'string', format: 'uuid' }, // uuid
    minItems: 1,
  },
}

export const roleSchema: SchemaProps = {
  name: {
    type: 'string',
    required: true,
    maxLength: 255,
  },
  description: {
    type: 'string',
    required: false,
    maxLength: 255,
  },
}

export const rolePermissionSchema: SchemaProps = {
  roleId: {
    type: 'string',
    required: true,
    format: 'uuid',
  },
  permissionIds: {
    type: 'array',
    required: true,
    items: { type: 'string', format: 'uuid' },
    minItems: 1,
  },
}

export const roleMenuSchema: SchemaProps = {
  roleId: {
    type: 'string',
    required: true,
    format: 'uuid',
  },
  menuIds: {
    type: 'array',
    required: true,
    items: { type: 'string', format: 'uuid' },
    minItems: 1,
  },
}

