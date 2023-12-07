import { PrismaClient } from '@prisma/client'

/** Create an instance of prisma client to work with the database */
const prisma = new PrismaClient()

export default prisma
