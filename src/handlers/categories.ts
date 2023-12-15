import { NextFunction, Request, Response } from 'express'
import prisma from '../db'

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        belongsToId: req.user.id,
      },
    })

    res.json({ data: categories })
  } catch (error: any) {
    next(error)
  }
}

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await prisma.category.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    })

    res.json({ data: category })
  } catch (error: any) {
    error.type = 'input'
    next(error)
  }
}

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await prisma.category.update({
      where: {
        category_id: req.params.id,
        belongsToId: req.user.id,
      },
      data: {
        name: req.body.name,
      },
    })

    res.json({ data: category })
  } catch (error: any) {
    error.type = 'input'
    next(error)
  }
}

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await prisma.category.delete({
      where: {
        category_id: req.params.id,
        belongsToId: req.user.id,
      },
    })

    res.status(200)
    res.json({
      data: category,
    })
  } catch (error: any) {
    next(error)
  }
}
