import { Router } from 'express'

// Router is not a constructor function, still it is uppercased because of old weird conventions
const router = Router()

/* Recipes */
router.get('/recipes', (req, res) => {
  res.json({ message: 'hello' })
})
router.get('/recipes/:id', () => {})
router.put('/recipes/:id', () => {})
router.post('/recipes', () => {})
router.delete('/recipes/:id', () => {})

/* Ingredients */
router.get('/ingredients', () => {})
// router.get('/ingredient/id', () => {})
router.put('/ingredients/:id', () => {})
router.post('/ingredients', () => {})
router.delete('/ingredients/:id', () => {})

/* Categories */
router.get('/categories', () => {})
// router.get('/categories/:id', () => {})
router.put('/categories/:id', () => {})
router.post('/categories', () => {})
router.delete('/categories/:id', () => {})

export default router
