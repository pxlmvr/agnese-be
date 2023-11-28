import app from './server'

const PORT = 5001

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
