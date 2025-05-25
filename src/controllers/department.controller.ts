import { Request, Response } from 'express'
import { listDepartments } from '../services/department.service.js'

export const DepartmentController = {
  list: async (_req: Request, res: Response) => {
    try {
      const deps = await listDepartments()
      res.json(deps)
    } catch (err: any) {
      console.error('Erro ao listar departamentos:', err)
      res.status(500).json({ error: err.message || 'Internal Server Error' })
    }
  },
}
