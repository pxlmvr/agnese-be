import { Request, Response, Router } from 'express'
import { body, validationResult } from 'express-validator'
import { handleInputErrors } from './modules/middleware'

// Router is not a constructor function, still it is uppercased because of old weird conventions
const router = Router()

/* Recipes */
router.get('/recipes', (_req: Request, res: Response) => {
  res.json({ message: 'hello' })
})
router.get('/recipes/:id', () => {})
router.put(
  '/recipes/:id',
  body('name').isString(),
  body('description').isString(),
  body('category_id').isString(),
  handleInputErrors,
  (req: Request, res: Response) => {
    // TODO: implement
  }
)
router.post(
  '/recipes',
  body('name').isString(),
  body('description').isString(),
  body('category_id').isString(),
  handleInputErrors,
  (req: Request, res: Response) => {
    // TODO: implement
  }
)
router.delete('/recipes/:id', () => {})

/* Ingredients */
router.get('/ingredients', () => {})
// router.get('/ingredient/id', () => {})
router.put(
  '/ingredients/:id',
  body('name').isString(),
  handleInputErrors,
  (req: Request, res: Response) => {
    // TODO: implement
  }
)
router.post(
  '/ingredients',
  body('name').isString(),
  handleInputErrors,
  (req: Request, res: Response) => {
    // TODO: implement
  }
)
router.delete('/ingredients/:id', () => {})

/* Categories */
router.get('/categories', () => {})
// router.get('/categories/:id', () => {})
router.put(
  '/categories/:id',
  body('name').isString(),
  handleInputErrors,
  (req: Request, res: Response) => {
    // TODO: implement
  }
)
router.post(
  '/categories',
  body('name').isString(),
  handleInputErrors,
  (req: Request, res: Response) => {
    // TODO: implement
  }
)
router.delete('/categories/:id', () => {})

export default router
