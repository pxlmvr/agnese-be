import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'

export const createJWT = (user: User) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  )

  return token
}
