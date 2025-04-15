import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
}).on('error', (err) => {
  console.error('Erro ao iniciar o servidor:', err)
})
