import { User } from 'src/types/user.type'

export const localStorageEventsTarget = new EventTarget()

export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken)
}
export const setRefreshTokenToLS = (refreshToken: string) => {
  localStorage.setItem('refresh_token', refreshToken)
}

export const clearDataFromLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
  const clearDataFromLSEvent = new Event('clearDataFromLS')
  localStorageEventsTarget.dispatchEvent(clearDataFromLSEvent)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
