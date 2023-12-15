import { Request, Response } from 'express'
import prisma from '../db'

export const getAllIngredients = async (_req: Request, res: Response) => {
  const ingredients = await prisma.ingredient.findMany()

  res.json({ data: ingredients })
}

export const createIngredient = async (req: Request, res: Response) => {
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
}

export const updateIngredient = async (req: Request, res: Response) => {
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
}

export const deleteIngredient = async (req: Request, res: Response) => {
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
}
