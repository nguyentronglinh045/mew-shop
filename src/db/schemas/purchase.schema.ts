import type { RxJsonSchema } from 'rxdb'

export interface PurchaseDoc {
  _id: string
  user_id: string
  product_id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: number
  createdAt: string
  updatedAt: string
}

export const purchaseSchema: RxJsonSchema<PurchaseDoc> = {
  title: 'purchase schema',
  version: 0,
  primaryKey: '_id',
  type: 'object',
  properties: {
    _id: { type: 'string', maxLength: 64 },
    user_id: { type: 'string', maxLength: 64 },
    product_id: { type: 'string', maxLength: 64 },
    buy_count: { type: 'number', minimum: 0, maximum: 100000, multipleOf: 1 },
    price: { type: 'number', minimum: 0, maximum: 1_000_000_000, multipleOf: 1 },
    price_before_discount: { type: 'number', minimum: 0, maximum: 1_000_000_000, multipleOf: 1 },
    status: { type: 'number', minimum: -1, maximum: 5, multipleOf: 1 },
    createdAt: { type: 'string', maxLength: 30 },
    updatedAt: { type: 'string', maxLength: 30 }
  },
  required: ['_id', 'user_id', 'product_id', 'buy_count', 'status'],
  indexes: ['user_id', 'status', 'product_id']
}
