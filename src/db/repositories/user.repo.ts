import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import { getDB } from 'src/db'
import { toUser } from 'src/db/mappers'
import type { UserDoc } from 'src/db/schemas/user.schema'
import { notFound, unprocessable } from 'src/db/response'
import type { User } from 'src/types/user.type'

const now = () => new Date().toISOString()

export interface CreateUserInput {
  email: string
  password: string
  name?: string
}

export interface UpdateUserInput {
  name?: string
  phone?: string
  address?: string
  avatar?: string
  date_of_birth?: string
  password?: string
  newPassword?: string
}

export const userRepo = {
  async findByEmail(email: string): Promise<UserDoc | null> {
    const db = await getDB()
    const doc = await db.users.findOne({ selector: { email } }).exec()
    return doc ? (doc.toJSON() as UserDoc) : null
  },

  async findById(id: string): Promise<UserDoc | null> {
    const db = await getDB()
    const doc = await db.users.findOne(id).exec()
    return doc ? (doc.toJSON() as UserDoc) : null
  },

  async create(input: CreateUserInput): Promise<User> {
    const db = await getDB()
    const existing = await db.users.findOne({ selector: { email: input.email } }).exec()
    if (existing) unprocessable({ email: 'Email đã tồn tại' }, 'Email đã tồn tại')

    const ts = now()
    const password_hash = await bcrypt.hash(input.password, 8)
    const doc = await db.users.insert({
      _id: nanoid(),
      email: input.email,
      password_hash,
      roles: ['User'],
      name: input.name ?? '',
      phone: '',
      address: '',
      date_of_birth: '',
      avatar: '',
      banned: false,
      createdAt: ts,
      updatedAt: ts
    })
    return toUser(doc.toJSON() as UserDoc)
  },

  async verifyPassword(email: string, password: string): Promise<UserDoc | null> {
    const doc = await this.findByEmail(email)
    if (!doc) return null
    if (doc.banned) return null
    const ok = await bcrypt.compare(password, doc.password_hash)
    return ok ? doc : null
  },

  async update(id: string, input: UpdateUserInput): Promise<User> {
    const db = await getDB()
    const doc = await db.users.findOne(id).exec()
    if (!doc) return notFound('User không tồn tại') as never

    if (input.newPassword) {
      const current = doc.toJSON() as UserDoc
      const okOld = input.password ? await bcrypt.compare(input.password, current.password_hash) : false
      if (!okOld) unprocessable({ password: 'Mật khẩu cũ không đúng' }, 'Mật khẩu cũ không đúng')
    }

    const patch: Partial<UserDoc> = { updatedAt: now() }
    if (input.name !== undefined) patch.name = input.name
    if (input.phone !== undefined) patch.phone = input.phone
    if (input.address !== undefined) patch.address = input.address
    if (input.avatar !== undefined) patch.avatar = input.avatar
    if (input.date_of_birth !== undefined) patch.date_of_birth = input.date_of_birth
    if (input.newPassword) patch.password_hash = await bcrypt.hash(input.newPassword, 8)

    await doc.patch(patch)
    return toUser(doc.toJSON() as UserDoc)
  }
}
