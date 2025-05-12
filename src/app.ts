import express from 'express'
import staff_router from './routes/staff.routes.js'
import auth_router from './routes/auth.routes.js'
import collaboratorRoutes from './routes/collaborator.routes.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/staff', staff_router)
app.use('/auth', auth_router)
app.use('/api', collaboratorRoutes)

export default app
