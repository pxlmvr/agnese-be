import { NextFunction, Request, Response } from 'express'
import prisma from '../db'

export const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        belongsToId: req.user.id,
      },
    })

    res.json({ data: recipes })
  } catch (error: any) {
    next(error)
  }
}

export const getRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipe = await prisma.recipe.findFirst({
      where: {
        recipe_id: req.params.id,
        belongsToId: req.user.id,
      },
    })

    if (!recipe) {
      res.status(404)
      res.end()
    } else {
      res.json({ recipe })
    }
  } catch (error: any) {
    next(error)
  }
}

export const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error: any) {
    next(error)
  }
}

export const updateRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error: any) {
    next(error)
  }
}

export const deleteRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await prisma.recipe.delete({
      where: {
        recipe_id: req.params.id,
        belongsToId: req.user.id,
      },
    })

    res.status(200)
    res.json({ data: deleted })
  } catch (error: any) {
    next(error)
  }
}
