import { nanoid } from 'nanoid'
import { getDB } from 'src/db'
import { toPurchase } from 'src/db/mappers'
import type { ProductDoc } from 'src/db/schemas/product.schema'
import type { PurchaseDoc } from 'src/db/schemas/purchase.schema'
import { notFound, ok, unauthorized, unprocessable } from 'src/db/response'
import type { Purchase, PurchaseListStatus } from 'src/types/purchase.type'

const now = () => new Date().toISOString()

const STATUS_IN_CART = -1
const STATUS_ALL = 0
const STATUS_WAIT_CONFIRM = 1

const requireUser = (userId: string | null): string => {
  if (!userId) {
    unauthorized('Yêu cầu đăng nhập')
    return ''
  }
  return userId
}

const loadProducts = async (productIds: string[]): Promise<Map<string, ProductDoc>> => {
  const db = await getDB()
  const map = await db.products.findByIds(productIds).exec()
  const out = new Map<string, ProductDoc>()
  map.forEach((doc, id) => out.set(id, doc.toJSON() as ProductDoc))
  return out
}

export const purchaseRepo = {
  async addToCart(userId: string | null, body: { product_id: string; buy_count: number }) {
    const uid = requireUser(userId)
    const db = await getDB()
    const product = await db.products.findOne(body.product_id).exec()
    if (!product) return notFound('Sản phẩm không tồn tại')
    if (body.buy_count <= 0) unprocessable({ buy_count: 'Số lượng phải > 0' }, 'Số lượng phải > 0')
    if (body.buy_count > product.quantity) {
      unprocessable({ buy_count: 'Số lượng vượt quá tồn kho' }, 'Số lượng vượt quá tồn kho')
    }

    const existing = await db.purchases
      .findOne({
        selector: { user_id: uid, product_id: body.product_id, status: STATUS_IN_CART }
      })
      .exec()

    let resultDoc: PurchaseDoc
    if (existing) {
      const cur = existing.toJSON() as PurchaseDoc
      const newCount = cur.buy_count + body.buy_count
      if (newCount > product.quantity)
        unprocessable({ buy_count: 'Số lượng vượt quá tồn kho' }, 'Số lượng vượt quá tồn kho')
      await existing.patch({ buy_count: newCount, updatedAt: now() })
      resultDoc = existing.toJSON() as PurchaseDoc
    } else {
      const ts = now()
      const inserted = await db.purchases.insert({
        _id: nanoid(),
        user_id: uid,
        product_id: body.product_id,
        buy_count: body.buy_count,
        price: product.price,
        price_before_discount: product.price_before_discount,
        status: STATUS_IN_CART,
        createdAt: ts,
        updatedAt: ts
      })
      resultDoc = inserted.toJSON() as PurchaseDoc
    }

    return ok(toPurchase(resultDoc, product.toJSON() as ProductDoc, uid))
  },

  async getPurchases(userId: string | null, params: { status: PurchaseListStatus }) {
    const uid = requireUser(userId)
    const db = await getDB()
    const selector: Record<string, unknown> = { user_id: uid }
    if (params.status !== STATUS_ALL) selector.status = params.status
    const docs = await db.purchases.find({ selector }).exec()
    if (docs.length === 0) return ok<Purchase[]>([])
    const productMap = await loadProducts(docs.map((d) => (d.toJSON() as PurchaseDoc).product_id))
    const items: Purchase[] = []
    for (const d of docs) {
      const j = d.toJSON() as PurchaseDoc
      const p = productMap.get(j.product_id)
      if (p) items.push(toPurchase(j, p, uid))
    }
    return ok(items)
  },

  async updatePurchase(userId: string | null, body: { product_id: string; buy_count: number }) {
    const uid = requireUser(userId)
    const db = await getDB()
    const doc = await db.purchases
      .findOne({ selector: { user_id: uid, product_id: body.product_id, status: STATUS_IN_CART } })
      .exec()
    if (!doc) return notFound('Item giỏ không tồn tại')
    const product = await db.products.findOne(body.product_id).exec()
    if (!product) return notFound('Sản phẩm không tồn tại')
    if (body.buy_count <= 0) unprocessable({ buy_count: 'Số lượng phải > 0' }, 'Số lượng phải > 0')
    if (body.buy_count > product.quantity)
      unprocessable({ buy_count: 'Số lượng vượt tồn kho' }, 'Số lượng vượt tồn kho')
    await doc.patch({ buy_count: body.buy_count, updatedAt: now() })
    return ok(toPurchase(doc.toJSON() as PurchaseDoc, product.toJSON() as ProductDoc, uid))
  },

  async deletePurchase(userId: string | null, purchaseIds: string[]) {
    const uid = requireUser(userId)
    const db = await getDB()
    const docs = await db.purchases.findByIds(purchaseIds).exec()
    let count = 0
    for (const [, doc] of docs) {
      const j = doc.toJSON() as PurchaseDoc
      if (j.user_id === uid && j.status === STATUS_IN_CART) {
        await doc.remove()
        count++
      }
    }
    return ok({ delete_count: count })
  },

  async buyProducts(userId: string | null, body: { product_id: string; buy_count: number }[]) {
    const uid = requireUser(userId)
    const db = await getDB()
    if (!body || body.length === 0) unprocessable({}, 'Không có sản phẩm để mua')
    const productMap = await loadProducts(body.map((b) => b.product_id))
    const ts = now()
    const results: Purchase[] = []

    for (const item of body) {
      const product = productMap.get(item.product_id)
      if (!product) continue
      if (item.buy_count <= 0 || item.buy_count > product.quantity) continue

      const productDoc = await db.products.findOne(item.product_id).exec()
      if (!productDoc) continue
      await productDoc.patch({
        quantity: product.quantity - item.buy_count,
        sold: product.sold + item.buy_count,
        updatedAt: ts
      })

      const existingCart = await db.purchases
        .findOne({ selector: { user_id: uid, product_id: item.product_id, status: STATUS_IN_CART } })
        .exec()
      if (existingCart) await existingCart.remove()

      const inserted = await db.purchases.insert({
        _id: nanoid(),
        user_id: uid,
        product_id: item.product_id,
        buy_count: item.buy_count,
        price: product.price,
        price_before_discount: product.price_before_discount,
        status: STATUS_WAIT_CONFIRM,
        createdAt: ts,
        updatedAt: ts
      })
      const updatedProduct = productDoc.toJSON() as ProductDoc
      results.push(toPurchase(inserted.toJSON() as PurchaseDoc, updatedProduct, uid))
    }

    return ok(results)
  }
}
