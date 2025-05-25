import app from './app.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
  console.log(
    `Permitindo requisições de: ${
      process.env.FRONTEND_URL || 'http://localhost:3000'
    }`
  )
})
