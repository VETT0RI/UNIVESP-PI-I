import { Router } from 'express'
import { CollaboratorController } from '../controllers/collaborator.controller.js'

const router = Router()

router.get('/', CollaboratorController.list)

router.get('/:id', CollaboratorController.getById)

router.post('/', CollaboratorController.create)

router.put('/:id', CollaboratorController.update)

router.delete('/:id', CollaboratorController.remove)

export default router
