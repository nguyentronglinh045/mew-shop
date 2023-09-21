import axios, { AxiosError, HttpStatusCode } from 'axios'
import { apiKey } from './http'

//type predicate function
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function getAvatarURL(avtID: string | undefined) {
  return avtID ? `${apiKey}images/${avtID}` : null
}
