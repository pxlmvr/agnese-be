import * as dotenv from 'dotenv'
import app from './server'
import config from './config'

// Load variables from env files
dotenv.config()

app.listen(config.port, () => {
  console.log(`server running on port ${config.port}`)
})

process.on('uncaughtException', () => {
  console.log('Oops there was an error')
})

process.on('unhandledRejection', () => {
  console.log('Oops there was an error')
})
