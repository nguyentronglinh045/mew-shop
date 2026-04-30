import { addRxPlugin, createRxDatabase, type RxCollection, type RxDatabase } from 'rxdb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder'
import { RxDBUpdatePlugin } from 'rxdb/plugins/update'
import { categorySchema, type CategoryDoc } from './schemas/category.schema'
import { productSchema, type ProductDoc } from './schemas/product.schema'
import { purchaseSchema, type PurchaseDoc } from './schemas/purchase.schema'
import { userSchema, type UserDoc } from './schemas/user.schema'
import { seedIfEmpty } from 'src/mocks/seed'

addRxPlugin(RxDBQueryBuilderPlugin)
addRxPlugin(RxDBUpdatePlugin)
let devModeLoaded = false
const ensureDevMode = async () => {
  if (devModeLoaded || !import.meta.env.DEV) return
  const { RxDBDevModePlugin } = await import('rxdb/plugins/dev-mode')
  addRxPlugin(RxDBDevModePlugin)
  devModeLoaded = true
}

const getStorage = async () => {
  const base = getRxStorageDexie()
  if (!import.meta.env.DEV) return base
  const { wrappedValidateAjvStorage } = await import('rxdb/plugins/validate-ajv')
  return wrappedValidateAjvStorage({ storage: base })
}

export type ProductCollection = RxCollection<ProductDoc>
export type CategoryCollection = RxCollection<CategoryDoc>
export type UserCollection = RxCollection<UserDoc>
export type PurchaseCollection = RxCollection<PurchaseDoc>

export interface MewCollections {
  products: ProductCollection
  categories: CategoryCollection
  users: UserCollection
  purchases: PurchaseCollection
}

export type MewDatabase = RxDatabase<MewCollections>

let dbPromise: Promise<MewDatabase> | null = null

export const DB_NAME = 'mewshop'

export const createDB = async (): Promise<MewDatabase> => {
  if (dbPromise) return dbPromise
  dbPromise = (async () => {
    await ensureDevMode()
    const storage = await getStorage()
    const db = await createRxDatabase<MewCollections>({
      name: DB_NAME,
      storage,
      ignoreDuplicate: true
    })
    await db.addCollections({
      products: { schema: productSchema },
      categories: { schema: categorySchema },
      users: { schema: userSchema },
      purchases: { schema: purchaseSchema }
    })
    await seedIfEmpty(db)
    return db
  })()
  return dbPromise
}

export const getDB = async (): Promise<MewDatabase> => {
  if (!dbPromise) return createDB()
  return dbPromise
}

export const resetDB = async (): Promise<void> => {
  const db = await getDB()
  await db.remove()
  dbPromise = null
}
