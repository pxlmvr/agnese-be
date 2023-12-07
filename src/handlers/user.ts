import { Request, Response } from 'express'
import prisma from '../db'
import { createJWT, hashPassword } from '../modules/auth'

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
