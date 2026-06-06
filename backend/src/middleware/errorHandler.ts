import { Request, Response, NextFunction } from 'express'

class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message)
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  console.error(`[${statusCode}] ${message}`)

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { error: err }),
  })
}

export { ApiError }
