import { Router } from 'express';
import { StaffController } from '../controllers/staff.controller.js';

const router = Router();

router.get('/', StaffController.list);
router.post('/', StaffController.create);

export { router as staff_router };