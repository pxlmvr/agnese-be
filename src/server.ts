import { protect } from './modules/auth'
import cors from 'cors'
import express from 'express'
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
  res.status(200)
  res.json({ message: 'Hello world' })
})

app.use('/api/v1', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signIn)

export default app
