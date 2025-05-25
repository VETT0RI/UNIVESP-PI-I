import { Request, Response, NextFunction } from 'express'
import { AuthService } from '../services/auth.service.js'

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email: string
      }
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' })
    return
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) {
    res.status(401).json({ message: 'Token error' })
    return
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).json({ message: 'Token malformatted' })
    return
  }

  try {
    const decoded = AuthService.verifyToken(token)
    req.user = {
      id: decoded.id,
      email: decoded.email,
    }
    return next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
    return
  }
}
