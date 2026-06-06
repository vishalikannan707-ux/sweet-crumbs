// @ts-nocheck
import jwt from 'jsonwebtoken'

export const generateToken = (id: string, isAdmin: boolean = false): string => {
  const secret = process.env.JWT_SECRET || 'secret'
  const token = jwt.sign({ id, isAdmin }, secret, { expiresIn: process.env.JWT_EXPIRE || '7d' })
  return token
}

export const verifyToken = (token: string) => {
  try {
    const secret = process.env.JWT_SECRET || 'secret'
    return jwt.verify(token, secret)
  } catch (error) {
    throw new Error('Invalid token')
  }
}
