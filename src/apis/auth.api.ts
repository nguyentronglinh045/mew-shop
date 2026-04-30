import type { AxiosResponse } from 'axios'
import { toUser } from 'src/db/mappers'
import { ok, unauthorized, unprocessable } from 'src/db/response'
import { userRepo } from 'src/db/repositories/user.repo'
import type { UserDoc } from 'src/db/schemas/user.schema'
import type { AuthResponse } from 'src/types/auth.type'
import type { SuccessResponseApi } from 'src/types/utils.type'
import { clearDataFromLS, setAccessTokenToLS, setProfileToLS, setRefreshTokenToLS } from 'src/utils/auth'
import { ACCESS_TTL_SEC, REFRESH_TTL_SEC, signAccess, signRefresh } from 'src/utils/jwt'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'

const buildAuthPayload = async (doc: UserDoc) => {
  const access_token = await signAccess(doc._id, doc.email)
  const refresh_token = await signRefresh(doc._id, doc.email)
  const user = toUser(doc)
  setAccessTokenToLS(access_token)
  setRefreshTokenToLS(refresh_token)
  setProfileToLS(user)
  return ok({
    access_token,
    refresh_token,
    expires: ACCESS_TTL_SEC,
    expire_refresh_token: REFRESH_TTL_SEC,
    user
  }) as AxiosResponse<AuthResponse>
}

const validateAuthInput = (body: { email: string; password: string }) => {
  const errors: Record<string, string> = {}
  if (!body.email) errors.email = 'Email không được để trống'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.email = 'Email không hợp lệ'
  if (!body.password) errors.password = 'Mật khẩu không được để trống'
  else if (body.password.length < 6) errors.password = 'Mật khẩu tối thiểu 6 ký tự'
  if (Object.keys(errors).length) unprocessable(errors, 'Dữ liệu không hợp lệ')
}

const authApi = {
  async registerAccount(body: { email: string; password: string }) {
    validateAuthInput(body)
    const user = await userRepo.create({ email: body.email, password: body.password })
    const doc = await userRepo.findById(user._id)
    if (!doc) unauthorized('Đăng ký thất bại')
    return buildAuthPayload(doc as UserDoc)
  },

  async loginAccount(body: { email: string; password: string }) {
    validateAuthInput(body)
    const doc = await userRepo.verifyPassword(body.email, body.password)
    if (!doc) unprocessable({ password: 'Email hoặc mật khẩu không đúng' }, 'Email hoặc mật khẩu không đúng')
    return buildAuthPayload(doc as UserDoc)
  },

  async logoutAccount() {
    clearDataFromLS()
    return ok({ message: 'Đăng xuất thành công' }) as AxiosResponse<SuccessResponseApi<{ message: string }>>
  }
}

export default authApi
