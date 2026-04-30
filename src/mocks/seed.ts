import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import type { MewDatabase } from 'src/db'

const now = () => new Date().toISOString()

const CATEGORIES_SEED = [
  'Áo thun',
  'Áo khoác',
  'Quần jeans',
  'Giày sneaker',
  'Phụ kiện',
  'Túi xách',
  'Mũ nón',
  'Đồng hồ'
]

const SAMPLE_IMAGES = [
  'https://picsum.photos/seed/mew1/400/400',
  'https://picsum.photos/seed/mew2/400/400',
  'https://picsum.photos/seed/mew3/400/400',
  'https://picsum.photos/seed/mew4/400/400',
  'https://picsum.photos/seed/mew5/400/400'
]

const PRODUCT_NAMES: Record<string, string[]> = {
  'Áo thun': ['Áo thun basic', 'Áo thun oversize', 'Áo thun cotton', 'Áo thun in hình', 'Áo thun polo'],
  'Áo khoác': ['Áo khoác bomber', 'Áo khoác dù', 'Áo khoác hoodie', 'Áo khoác denim', 'Áo khoác varsity'],
  'Quần jeans': ['Quần jeans slim', 'Quần jeans baggy', 'Quần jeans skinny', 'Quần jeans rách', 'Quần jeans wash'],
  'Giày sneaker': ['Sneaker low-top', 'Sneaker high-top', 'Sneaker chunky', 'Sneaker canvas', 'Sneaker chạy bộ'],
  'Phụ kiện': ['Dây chuyền bạc', 'Vòng tay da', 'Nhẫn titan', 'Khuyên tai', 'Kính râm'],
  'Túi xách': ['Túi tote', 'Túi đeo chéo', 'Balo laptop', 'Túi bao tử', 'Cặp công sở'],
  'Mũ nón': ['Mũ lưỡi trai', 'Mũ bucket', 'Mũ len', 'Mũ rộng vành', 'Mũ snapback'],
  'Đồng hồ': ['Đồng hồ cơ', 'Đồng hồ thể thao', 'Đồng hồ điện tử', 'Smartwatch', 'Đồng hồ dây da']
}

interface SeedOpts {
  productsPerCategory?: number
}

const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export const seedIfEmpty = async (db: MewDatabase, opts: SeedOpts = {}): Promise<void> => {
  const productsPerCategory = opts.productsPerCategory ?? 6

  const productCount = await db.products.count().exec()
  const categoryCount = await db.categories.count().exec()
  const userCount = await db.users.count().exec()

  if (productCount > 0 && categoryCount > 0 && userCount > 0) return

  const ts = now()

  if (categoryCount === 0) {
    const cats = CATEGORIES_SEED.map((name) => ({ _id: nanoid(), name }))
    await db.categories.bulkInsert(cats)
  }

  const cats = await db.categories.find().exec()

  if (productCount === 0) {
    const products = []
    for (const cat of cats) {
      const names = PRODUCT_NAMES[cat.name] ?? ['Sản phẩm']
      for (let i = 0; i < productsPerCategory; i++) {
        const base = pick(names)
        const price_before_discount = randInt(150_000, 2_000_000)
        const discount = randInt(0, 40) / 100
        const price = Math.round((price_before_discount * (1 - discount)) / 1000) * 1000
        products.push({
          _id: nanoid(),
          name: `${base} ${i + 1}`,
          description: `${base} chất liệu cao cấp, thiết kế trẻ trung. Phù hợp đi chơi, đi làm.`,
          price,
          price_before_discount,
          quantity: randInt(5, 200),
          sold: randInt(0, 500),
          view: randInt(0, 5000),
          rating: Math.round((Math.random() * 4 + 1) * 10) / 10,
          image: pick(SAMPLE_IMAGES),
          images: SAMPLE_IMAGES.slice(0, randInt(2, 5)),
          category_id: cat._id,
          category_name: cat.name,
          createdAt: ts,
          updatedAt: ts
        })
      }
    }
    await db.products.bulkInsert(products)
  }

  if (userCount === 0) {
    const adminHash = await bcrypt.hash('admin123', 8)
    const userHash = await bcrypt.hash('user1234', 8)
    await db.users.bulkInsert([
      {
        _id: nanoid(),
        email: 'admin@mew.dev',
        password_hash: adminHash,
        roles: ['User', 'Admin'],
        name: 'Admin',
        phone: '',
        address: '',
        date_of_birth: '',
        avatar: '',
        banned: false,
        createdAt: ts,
        updatedAt: ts
      },
      {
        _id: nanoid(),
        email: 'user@mew.dev',
        password_hash: userHash,
        roles: ['User'],
        name: 'Demo User',
        phone: '',
        address: '',
        date_of_birth: '',
        avatar: '',
        banned: false,
        createdAt: ts,
        updatedAt: ts
      }
    ])
  }
}
