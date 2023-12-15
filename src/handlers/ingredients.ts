import { NextFunction, Request, Response } from 'express'
import prisma from '../db'

export const getAllIngredients = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ingredients = await prisma.ingredient.findMany()

    res.json({ data: ingredients })
  } catch (error: any) {
    next(error)
  }
}

export const createIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ingredient = await prisma.ingredient.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    })

    res.status(201)
    res.json({
      data: ingredient,
    })
  } catch (error: any) {
    error.type = 'input'
    next(error)
  }
}

export const updateIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await prisma.ingredient.update({
      where: {
        ingredient_id: req.params.id,
        belongsToId: req.user.id,
      },
      data: {
        name: req.body.name,
      },
    })

    res.status(200)
    res.json({
      data: updated,
    })
  } catch (error: any) {
    error.type = 'input'
    next(error)
  }
}

export const deleteIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ingredient = await prisma.ingredient.delete({
      where: {
        ingredient_id: req.params.id,
        belongsToId: req.user.id,
      },
    })

    res.status(200)
    res.json({
      data: ingredient,
    })
  } catch (error: any) {
    next(error)
  }
}
