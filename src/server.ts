import { protect } from './modules/auth'
import cors from 'cors'
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express'
import morgan from 'morgan'
import router from './router'
import { createNewUser, signIn } from './handlers/user'
import { body } from 'express-validator'
import { handleErrors } from './handlers/errors'

const app = express()

app.use(morgan('dev'))

// TODO: configure
app.use(cors())

// MW to parse JSON coming from the client
app.use(express.json())

// MW to parse query parameters into an object form ('...?name=john&age=32') => {name: 'john', age: 32}
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req, res, next) => {
  res.json({ message: 'Hello World' })
})

app.use('/api/v1', protect, router)

app.post(
  '/user',
  body('username').isString(),
  body('password').isString(),
  createNewUser
)
app.post(
  '/signin',
  body('username').isString(),
  body('password').isString(),
  signIn
)

// Handle synchronous errors happening on any route
app.use(handleErrors)

export default app
