import type { SchemaProps } from './base'

const userNameReg = '^[a-zA-Z0-9_]{4,20}$' // 正则校验4-20位，包含数字、字母、下划线
const passwordReg = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$' // 正则校验最少6位，包含数字和字母
const emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const userSchema: SchemaProps = {
  username: {
    type: 'string',
    required: true,
    description: '用户名',
    example: 'dongdong',
    pattern: userNameReg,
    message: '用户名必须包含字母和数字，且长度至少为4位',
  },
  password: {
    type: 'string',
    required: true,
    description: '密码',
    example: '1234Dong',
    pattern: passwordReg,
    message: '密码必须包含字母和数字，且长度至少为6位',
  },
  email: {
    type: 'string',
    required: false,
    description: '邮箱',
    example: '123456789@qq.com',
    pattern: emailReg,
  },
}

export const loginSchema: SchemaProps = {
  username: {
    type: 'string',
    required: true,
    description: '用户名',
    example: 'dongdong',
    pattern: userNameReg,
    message: '用户名必须包含字母和数字，且长度至少为4位',
  },
  password: {
    type: 'string',
    required: true,
    description: '密码',
    example: '1234Dong',
    pattern: passwordReg,
    message: '密码必须包含字母和数字，且长度至少为6位',
  },
}

export const passwordSchema: SchemaProps = {
  username: {
    type: 'string',
    required: true,
    description: '用户名',
    pattern: userNameReg,
  },
  password: {
    type: 'string',
    required: true,
    description: '密码',
    pattern: passwordReg,
  },
  newPassword: {
    type: 'string',
    required: true,
    description: '新密码',
    pattern: passwordReg,
    message: '密码必须包含字母和数字，且长度至少为6位',
  },
}

export const userInfoSchema: SchemaProps = {
  email: {
    type: 'string',
    required: false,
    description: '邮箱',
    example: '123456789@qq.com',
    pattern: emailReg,
  },
  nickname: {
    type: 'string',
    required: false,
    description: '昵称',
    example: '马牛逼',
  },
  avatar: {
    type: 'string',
    required: false,
    description: '头像',
    example: 'url地址',
  },
}
