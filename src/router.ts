import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from './modules/middleware'
import {
  createIngredient,
  deleteIngredient,
  getAllIngredients,
  updateIngredient,
} from './handlers/ingredients'
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
} from './handlers/recipes'
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from './handlers/categories'

// Router is not a constructor function, still it is uppercased because of old weird conventions
const router = Router()

/* Recipes */
router.get('/recipes', getAllRecipes)
router.get('/recipes/:id', getRecipe)
router.put(
  '/recipes/:id',
  body('name').isString().optional(),
  body('description').isString().optional(),
  body('category_id').isString().optional(),
  handleInputErrors,
  updateRecipe
)
router.post(
  '/recipes',
  body('name').isString(),
  body('description').isString(),
  body('ingredients').isArray().optional(),
  body('category_id').isString().optional(),
  handleInputErrors,
  createRecipe
)
router.delete('/recipes/:id', deleteRecipe)

/* Ingredients */
router.get('/ingredients', getAllIngredients)
router.put(
  '/ingredients/:id',
  body('name').isString(),
  handleInputErrors,
  updateIngredient
)
router.post(
  '/ingredients',
  body('name').isString(),
  handleInputErrors,
  createIngredient
)
router.delete('/ingredients/:id', deleteIngredient)

/* Categories */
router.get('/categories', getAllCategories)
router.put(
  '/categories/:id',
  body('name').isString(),
  handleInputErrors,
  updateCategory
)
router.post(
  '/categories',
  body('name').isString(),
  handleInputErrors,
  createCategory
)
router.delete('/categories/:id', deleteCategory)

export default router
