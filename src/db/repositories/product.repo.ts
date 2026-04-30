import { getDB } from 'src/db'
import { toProduct } from 'src/db/mappers'
import type { ProductDoc } from 'src/db/schemas/product.schema'
import { notFound, ok } from 'src/db/response'
import type { ProductList, ProductListConfig } from 'src/types/product.type'

const num = (v: unknown, d: number) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : d
}

export const productRepo = {
  async list(params: ProductListConfig) {
    const db = await getDB()
    const all = await db.products.find().exec()
    let items: ProductDoc[] = all.map((d) => d.toJSON() as ProductDoc)

    if (params.category) items = items.filter((p) => p.category_id === params.category)
    if (params.exclude) items = items.filter((p) => p._id !== params.exclude)
    if (params.name) {
      const q = String(params.name).toLowerCase()
      items = items.filter((p) => p.name.toLowerCase().includes(q))
    }
    if (params.rating_filter !== undefined && params.rating_filter !== '') {
      const r = num(params.rating_filter, 0)
      items = items.filter((p) => p.rating >= r)
    }
    if (params.price_min !== undefined && params.price_min !== '') {
      const min = num(params.price_min, 0)
      items = items.filter((p) => p.price >= min)
    }
    if (params.price_max !== undefined && params.price_max !== '') {
      const max = num(params.price_max, Number.POSITIVE_INFINITY)
      items = items.filter((p) => p.price <= max)
    }

    const sortBy = (params.sort_by ?? 'createdAt') as keyof ProductDoc
    const order = params.order ?? 'desc'
    items.sort((a, b) => {
      const av = a[sortBy] as number | string
      const bv = b[sortBy] as number | string
      if (av < bv) return order === 'asc' ? -1 : 1
      if (av > bv) return order === 'asc' ? 1 : -1
      return 0
    })

    const page = Math.max(1, num(params.page, 1))
    const limit = Math.max(1, num(params.limit, 30))
    const total = items.length
    const page_size = Math.max(1, Math.ceil(total / limit))
    const start = (page - 1) * limit
    const paged = items.slice(start, start + limit)

    const result: ProductList = {
      products: paged.map(toProduct),
      pagination: { page, limit, page_size }
    }
    return ok(result)
  },

  async getById(id: string) {
    const db = await getDB()
    const doc = await db.products.findOne(id).exec()
    if (!doc) return notFound('Sản phẩm không tồn tại')
    return ok(toProduct(doc.toJSON() as ProductDoc))
  }
}
