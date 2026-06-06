import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export interface AuthRequest extends Request {
  user?: { id: string; isAdmin: boolean }
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      res.status(401).json({ message: 'No token provided' })
      return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
      id: string
      isAdmin: boolean
    }
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user?.isAdmin) {
    res
      .status(403)
      .json({ message: 'Access denied. Admin privileges required.' })
    return
  }
  next()
}
