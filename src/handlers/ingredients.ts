import { Request, Response } from 'express'
import prisma from '../db'

export const getAllIngredients = async (req: Request, res: Response) => {
  const ingredients = await prisma.ingredient.findMany()

  res.json({ ingredients })
}

export const createIngredient = async (req: Request, res: Response) => {
  const ingredient = await prisma.ingredient.create({
    data: {
      name: req.body.name,
    },
  })

  res.status(201)
  res.json({
    ingredient,
  })
}

export const updateIngredient = async (req: Request, res: Response) => {
  const ingredient = await prisma.ingredient.update({
    where: {
      ingredient_id: req.params.id,
    },
    data: {
      name: req.body.name,
    },
  })

  res.status(200)
  res.json({
    ingredient,
  })
}

export const deleteIngredient = async (req: Request, res: Response) => {
  const ingredient = await prisma.ingredient.delete({
    where: {
      ingredient_id: req.params.id,
    },
  })

  res.status(200)
  res.json({
    ingredient,
  })
}
