import { Router } from 'express'
import { DepartmentController } from '../controllers/department.controller.js'

const router = Router()

router.get('/departments', DepartmentController.list)

export default router
