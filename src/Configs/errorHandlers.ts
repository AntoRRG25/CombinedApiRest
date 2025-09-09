import { type Request, type Response, type NextFunction } from 'express'

export function throwError (message: string, status: number): never {
  const error = new Error(message) as Error & { status?: number }
  error.status = status
  throw error
}
export function middError (message: string, status: number) {
  const error = new Error(message) as Error & { status?: number }
  error.status = status
  return error
}
export const jsonErrorHandler = (err: Error & { status?: number }, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
    next(middError('Invalid JSON format', 400)); return
  }
  next()
}
export const notFoundRoute = (req: Request, res: Response, next: NextFunction): void => {
  next(middError('Route not Found', 404))
}

export function mainErrorHandler (err: Error & { status?: number }, req: Request, res: Response, next: NextFunction) {
  const status = err.status ?? 500
  const message = err.message ?? 'Unexpected server error'
  res.status(status).json({
    success: false,
    message,
    results: null
  })
}
