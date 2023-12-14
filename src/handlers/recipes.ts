import { Request, Response } from 'express'
import prisma from '../db'

export const getAllRecipes = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      recipes: true,
    },
  })

  res.json({ data: user!.recipes })
}

export const getRecipe = async (req: Request, res: Response) => {
  const recipe = await prisma.recipe.findFirst({
    where: {
      recipe_id: req.params.id,
      belongsToId: req.user.id,
    },
  })

  res.json({ recipe })
}

export const createRecipe = async (req: Request, res: Response) => {
  const recipe = await prisma.recipe.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients,
      category: req.body.category,
      belongsToId: req.user.id,
    },
  })
  res.json({ data: recipe })
}

export const updateRecipe = async (req: Request, res: Response) => {
  const updated = await prisma.recipe.update({
    where: {
      recipe_id: req.params.id,
    },
    data: {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
    },
  })

  res.status(200)
  res.json({ data: updated })
}

export const deleteRecipe = async (req: Request, res: Response) => {
  const deleted = await prisma.recipe.delete({
    where: {
      recipe_id: req.params.id,
      belongsToId: req.user.id,
    },
  })

  res.status(200)
  res.json({ data: deleted })
}
