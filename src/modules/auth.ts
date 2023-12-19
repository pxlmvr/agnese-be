import { User } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import config from '../config'

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

export const createJWT = (user: User) => {
  if (!config.secrets.jwt) {
    throw new Error('JWT_SECRET is not defined')
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    config.secrets.jwt
  )

  return token
}

/** Middleware to protect access to private routes */
export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    res.status(401)
    res.send({ message: 'Not authorized' })
    return
  }

  const [_bearer, token] = bearer.split(' ')

  if (!token) {
    res.status(401)
    res.send({ message: 'Invalid token' })
    return
  }

  try {
    const user = jwt.verify(token, config.secrets.jwt)

    // Augment the response with the user data so everywhere in the stack user data can be accessed
    req.user = user
    next()
  } catch (error) {
    console.error(error)
    res.status(401)
    res.json({ message: 'Invalid token' })
  }
}

/**
 * Hashes a plain text password using bcrypt
 * @param plainTextPassword - The plain text password to be hashed
 * @param salt - The number of rounds to use when generating a salt
 * @returns The hashed password
 */
export const hashPassword = (plainTextPassword: string, salt: number = 5) => {
  return bcrypt.hash(plainTextPassword, salt)
}

/**
 * Compares a plain text password with a stored hashed password to verify the user's login
 * @param plainPassword - The plain text password to be compared
 * @param storedHashedPassword - The stored hashed password to be compared
 * @returns A boolean indicating whether the passwords match
 */
export const comparePasswords = (
  plainPassword: string,
  storedHashedPassword: string
) => {
  return bcrypt.compare(plainPassword, storedHashedPassword)
}
