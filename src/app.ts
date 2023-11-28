import * as dotenv from 'dotenv'
import app from './server'

// Load variables from env files
dotenv.config()

const PORT = 5001

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
