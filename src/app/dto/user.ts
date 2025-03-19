import type { SchemaProps } from './base'

export const userSchema: SchemaProps = {
  username: {
    type: 'string',
    required: true,
    description: '用户名',
    example: 'admin',
    pattern: '^[a-zA-Z0-9_]{4,20}$', // 正则校验
  },
  password: {
    type: 'string',
    required: true,
    description: '密码',
    example: '123456',
    pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$', // 正则校验最少6位，包含数字和字母
  },
}

export const passwordSchema: SchemaProps = {
  username: {
    type: 'string',
    required: true,
    description: '用户名',
    pattern: '^[a-zA-Z0-9_]{4,20}$',
  },
  password: {
    type: 'string',
    required: true,
    description: '密码',
    pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$',
  },
  newPassword: {
    type: 'string',
    required: true,
    description: '新密码',
    pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$',
  },
}
