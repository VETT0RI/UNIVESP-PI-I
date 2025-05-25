import { Router } from 'express'
import { StaffController } from '../controllers/staff.controller.js'
import { validateData } from '../middlewares/validation.middleware.js'
import { createStaffSchema } from '../schemas/staff.schema.js'

const router = Router()

router.get('/', StaffController.list)
router.post('/', validateData(createStaffSchema), StaffController.create)

export default router
