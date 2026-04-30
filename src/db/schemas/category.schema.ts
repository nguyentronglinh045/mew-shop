import type { RxJsonSchema } from 'rxdb'

export interface CategoryDoc {
  _id: string
  name: string
}

export const categorySchema: RxJsonSchema<CategoryDoc> = {
  title: 'category schema',
  version: 0,
  primaryKey: '_id',
  type: 'object',
  properties: {
    _id: { type: 'string', maxLength: 64 },
    name: { type: 'string', maxLength: 200 }
  },
  required: ['_id', 'name']
}
