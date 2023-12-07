import { Request, Response } from 'express'
import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'

export const createNewUser = async (req: Request, res: Response) => {
  // Write user to the database
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  })

  // Create a token to issue the user in order to log in
  const token = createJWT(user)

  res.json({ token })
}

export const signIn = async (req: Request, res: Response) => {
  // Fetch the user with corresponding username from db
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  })

  if (!user) {
    res.status(404)
    res.json({ message: 'User not found' })
    return
  }

  // compare password with hashed password
  const isValid = await comparePasswords(req.body.password, user.password)

  if (!isValid) {
    res.status(401)
    res.json({ message: 'Unauthorized' })
    return
  }

  const token = createJWT(user)
  res.json({ token })
}
