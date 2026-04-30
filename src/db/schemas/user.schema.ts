import type { RxJsonSchema } from 'rxdb'

export interface UserDoc {
  _id: string
  email: string
  password_hash: string
  roles: string[]
  name: string
  phone: string
  address: string
  date_of_birth: string
  avatar: string
  banned: boolean
  createdAt: string
  updatedAt: string
}

export const userSchema: RxJsonSchema<UserDoc> = {
  title: 'user schema',
  version: 0,
  primaryKey: '_id',
  type: 'object',
  properties: {
    _id: { type: 'string', maxLength: 64 },
    email: { type: 'string', maxLength: 200 },
    password_hash: { type: 'string', maxLength: 200 },
    roles: { type: 'array', items: { type: 'string', maxLength: 20 } },
    name: { type: 'string', maxLength: 200 },
    phone: { type: 'string', maxLength: 30 },
    address: { type: 'string', maxLength: 300 },
    date_of_birth: { type: 'string', maxLength: 30 },
    avatar: { type: 'string', maxLength: 300 },
    banned: { type: 'boolean' },
    createdAt: { type: 'string', maxLength: 30 },
    updatedAt: { type: 'string', maxLength: 30 }
  },
  required: ['_id', 'email', 'password_hash', 'roles'],
  indexes: ['email']
}
