import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

type AugmentedError = ErrorRequestHandler & {
  type: 'auth' | 'input' | undefined
}

export const handleErrors = (
  err: AugmentedError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  switch (err.type) {
    case 'auth':
      res.status(401).json({ message: 'Unauthorized' })
      break
    case 'input':
      res.status(400).json({ message: 'Invalid input' })
      break
    default:
      res.status(500).json({ message: 'Oops, something went wrong' })
  }
}
