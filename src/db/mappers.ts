import type { ProductDoc } from './schemas/product.schema'
import type { PurchaseDoc } from './schemas/purchase.schema'
import type { UserDoc } from './schemas/user.schema'
import type { Product } from 'src/types/product.type'
import type { Purchase, PurchaseStatus } from 'src/types/purchase.type'
import type { User } from 'src/types/user.type'

export const toProduct = (doc: ProductDoc): Product => ({
  _id: doc._id,
  name: doc.name,
  description: doc.description,
  price: doc.price,
  price_before_discount: doc.price_before_discount,
  quantity: doc.quantity,
  sold: doc.sold,
  view: doc.view,
  rating: doc.rating,
  image: doc.image,
  images: doc.images ?? [],
  category: { _id: doc.category_id, name: doc.category_name },
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt
})

export const toUser = (doc: UserDoc): User => ({
  _id: doc._id,
  email: doc.email,
  roles: (doc.roles as User['roles']) ?? ['User'],
  name: doc.name || '',
  phone: doc.phone || '',
  address: doc.address || '',
  date_of_birth: doc.date_of_birth || undefined,
  avatar: doc.avatar || '',
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt
})

export const toPurchase = (purchaseDoc: PurchaseDoc, productDoc: ProductDoc, userId: string): Purchase => ({
  _id: purchaseDoc._id,
  buy_count: purchaseDoc.buy_count,
  price: purchaseDoc.price,
  price_before_discount: purchaseDoc.price_before_discount,
  status: purchaseDoc.status as PurchaseStatus,
  user: userId,
  product: toProduct(productDoc),
  createdAt: purchaseDoc.createdAt,
  updatedAt: purchaseDoc.updatedAt
})
