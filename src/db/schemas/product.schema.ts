import type { RxJsonSchema } from 'rxdb'

export interface ProductDoc {
  _id: string
  name: string
  description: string
  price: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  rating: number
  image: string
  images: string[]
  category_id: string
  category_name: string
  createdAt: string
  updatedAt: string
}

export const productSchema: RxJsonSchema<ProductDoc> = {
  title: 'product schema',
  version: 0,
  primaryKey: '_id',
  type: 'object',
  properties: {
    _id: { type: 'string', maxLength: 64 },
    name: { type: 'string', maxLength: 200 },
    description: { type: 'string' },
    price: { type: 'number', minimum: 0, maximum: 1_000_000_000, multipleOf: 1 },
    price_before_discount: { type: 'number', minimum: 0, maximum: 1_000_000_000, multipleOf: 1 },
    quantity: { type: 'number', minimum: 0, maximum: 1_000_000, multipleOf: 1 },
    sold: { type: 'number', minimum: 0, maximum: 1_000_000, multipleOf: 1 },
    view: { type: 'number', minimum: 0, maximum: 10_000_000, multipleOf: 1 },
    rating: { type: 'number', minimum: 0, maximum: 5 },
    image: { type: 'string' },
    images: { type: 'array', items: { type: 'string' } },
    category_id: { type: 'string', maxLength: 64 },
    category_name: { type: 'string', maxLength: 200 },
    createdAt: { type: 'string', maxLength: 30 },
    updatedAt: { type: 'string', maxLength: 30 }
  },
  required: ['_id', 'name', 'price', 'price_before_discount', 'quantity', 'sold', 'view', 'createdAt', 'category_id'],
  indexes: ['category_id', 'name', 'price', 'sold', 'view', 'createdAt']
}
