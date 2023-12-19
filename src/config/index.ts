import merge from 'lodash.merge'
import dotenv from 'dotenv'

dotenv.config()

type Stage = 'production' | 'testing' | 'local'

type Config = {
  stage: Stage
  env: string
  port: number
  secrets: {
    jwt: string
    dbUrl: string
  }
}

// Default env to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const stage: Stage = (process.env.stage as Stage) || 'local'

let envConfig

if (stage === 'production') {
  envConfig = require('./prod').default
} else if (stage === 'testing') {
  envConfig = require('./testing').default
} else {
  envConfig = require('./local').default
}

const config: Config = merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: 5001,
    secrets: {
      jwt: process.env.JWT_SECRET,
      dbUrl: process.env.DATABASE_URL,
    },
  },
  envConfig
)

export default config
