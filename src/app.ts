import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import staffRoutes from './routes/staff.routes.js'
import collaboratorRoutes from './routes/collaborator.routes.js'
import departametRoutes from './routes/department.routes.js'
import authRoutes from './routes/auth.routes.js'

dotenv.config()

const app = express()

const frontendURL: string = process.env.FRONTEND_URL || 'http://localhost:3000'

const corsOptions = {
  origin: frontendURL,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: 'ok', message: 'Servidor Express funcionando!' })
})

app.use('/api/staff', staffRoutes)
app.use('/api/auth', authRoutes)
app.use('/api', collaboratorRoutes)
app.use('/api', departametRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Rota não encontrada' })
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack)

  if (res.headersSent) {
    return next(err)
  }

  res.status(err.status || 500).json({
    message: err.message || 'Ocorreu um erro no servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}
app.use(errorHandler)

export default app
