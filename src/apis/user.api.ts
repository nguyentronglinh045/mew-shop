import { ok, unauthorized } from 'src/db/response'
import { userRepo } from 'src/db/repositories/user.repo'
import { toUser } from 'src/db/mappers'
import type { User } from 'src/types/user.type'
import { getProfileFromLS, setProfileToLS } from 'src/utils/auth'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const currentUserId = (): string | null => {
  const profile = getProfileFromLS() as { _id?: string } | null
  return profile?._id ?? null
}

const userApi = {
  async getProfile() {
    const id = currentUserId()
    if (!id) unauthorized('Yêu cầu đăng nhập')
    const doc = await userRepo.findById(id as string)
    if (!doc) unauthorized('User không tồn tại')
    const user = toUser(doc!)
    setProfileToLS(user)
    return ok(user)
  },

  async updateProfile(body: BodyUpdateProfile) {
    const id = currentUserId()
    if (!id) unauthorized('Yêu cầu đăng nhập')
    const updated = await userRepo.update(id as string, {
      name: body.name,
      phone: body.phone,
      address: body.address,
      avatar: body.avatar,
      date_of_birth: body.date_of_birth,
      password: body.password,
      newPassword: body.newPassword
    })
    setProfileToLS(updated)
    return ok(updated)
  },

  async uploadAvatar(_body: FormData) {
    void _body
    const fakeUrl = `https://picsum.photos/seed/${Math.random().toString(36).slice(2, 8)}/200/200`
    return ok(fakeUrl)
  }
}

export default userApi
