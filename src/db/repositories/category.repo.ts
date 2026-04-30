import { getDB } from 'src/db'
import { ok } from 'src/db/response'
import type { CategoryDoc } from 'src/db/schemas/category.schema'
import type { Category } from 'src/types/category.type'

export const categoryRepo = {
  async list() {
    const db = await getDB()
    const docs = await db.categories.find().exec()
    const items: Category[] = docs.map((d) => {
      const j = d.toJSON() as CategoryDoc
      return { _id: j._id, name: j.name }
    })
    return ok(items)
  }
}
