import { AxiosError, AxiosHeaders, type AxiosResponse } from 'axios'
import type { SuccessResponseApi } from 'src/types/utils.type'

export const ok = <T>(data: T, message = 'Success'): AxiosResponse<SuccessResponseApi<T>> => {
  return {
    data: { message, data },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: { headers: new AxiosHeaders() }
  } as AxiosResponse<SuccessResponseApi<T>>
}

export const apiError = <D = unknown>(status: number, message: string, data?: D): never => {
  const response: AxiosResponse = {
    data: { message, data },
    status,
    statusText: '',
    headers: {},
    config: { headers: new AxiosHeaders() }
  } as AxiosResponse
  throw new AxiosError(message, String(status), undefined, undefined, response)
}

export const unprocessable = (fields: Record<string, string>, message = 'Lỗi'): never => apiError(422, message, fields)
export const unauthorized = (message = 'Unauthorized', name = 'INVALID_CREDENTIALS'): never =>
  apiError(401, message, { name, message })
export const expiredToken = (message = 'Token hết hạn'): never =>
  apiError(401, message, { name: 'EXPIRED_TOKEN', message })
export const notFound = (message = 'Không tìm thấy'): never => apiError(404, message)
