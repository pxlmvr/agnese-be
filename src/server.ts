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

const app = express()

app.use(morgan('dev'))

// TODO: configure
app.use(cors())

// MW to parse JSON coming from the client
app.use(express.json())

// MW to parse query parameters into an object form ('...?name=john&age=32') => {name: 'john', age: 32}
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req, res) => {
  res.json({ message: 'Hello from Agnese' })
})

app.use('/api/v1', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signIn)

// Handle synchronous errors happening on any route
app.use(
  (
    err: ErrorRequestHandler,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void => {
    console.log(err)
    res.json({ message: 'Oops there was a problem' })
  }
)

export default app
