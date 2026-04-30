import { SignJWT, jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode('mew-shop-dev-secret-do-not-use-in-prod')
const ISSUER = 'mew-shop'

export const ACCESS_TTL_SEC = 60 * 60 // 1h
export const REFRESH_TTL_SEC = 60 * 60 * 24 * 30 // 30d

export interface JwtPayload {
  sub: string
  email: string
  type: 'access' | 'refresh'
}

const sign = async (payload: JwtPayload, ttlSec: number) => {
  return await new SignJWT({ email: payload.email, type: payload.type })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(ISSUER)
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${ttlSec}s`)
    .sign(SECRET)
}

export const signAccess = (sub: string, email: string) => sign({ sub, email, type: 'access' }, ACCESS_TTL_SEC)
export const signRefresh = (sub: string, email: string) => sign({ sub, email, type: 'refresh' }, REFRESH_TTL_SEC)

export const verifyToken = async (token: string): Promise<JwtPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, SECRET, { issuer: ISSUER })
    return {
      sub: payload.sub as string,
      email: payload.email as string,
      type: payload.type as 'access' | 'refresh'
    }
  } catch {
    return null
  }
}

export const isExpired = async (token: string): Promise<boolean> => {
  if (!token) return true
  const payload = await verifyToken(token)
  return payload === null
}
