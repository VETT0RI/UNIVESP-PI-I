import { Router } from 'express'
import { CollaboratorController } from '../controllers/collaborator.controller.js'

const router = Router()

router.get('/collaborators', CollaboratorController.list)

router.get('/collaborator/:id', CollaboratorController.getById)

router.post('/collaborator', ...CollaboratorController.create)

router.put('/collaborator/:id', CollaboratorController.update)

router.delete('/collaborator/:id', CollaboratorController.remove)

export default router
