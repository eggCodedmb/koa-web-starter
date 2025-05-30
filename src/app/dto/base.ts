import type { ModelStatic } from 'sequelize'

type SchemaType = 'string' | 'number' | 'boolean' | 'object' | 'array'

export interface SchemaProps {
  [x: string]: {
    type: SchemaType
    required: boolean
    [x: string]: any
  }
}

export const pagingSchema: SchemaProps = {
  start: { type: 'number', required: false, default: 1 },
  limit: { type: 'number', required: false, default: 20 },
  order: { type: 'string', required: false, default: 'DESC' },
}

export const pagingSchemaUser = {
  ...pagingSchema,
  email: { type: 'string', required: false, default: '' },
  nickname: { type: 'string', required: false, default: '' },
  username: { type: 'string', required: false, default: '' },
}

export class Paging<T> {
  page = 1
  total = 0
  pageTotal = 0
  items: T[] = []
  constructor(items: T[], total: number, start: number, limit: number) {
    this.total = total
    this.page = start
    this.items = items
    this.pageTotal = Math.ceil(total / limit)
  }
}
