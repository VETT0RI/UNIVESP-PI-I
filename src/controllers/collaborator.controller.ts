import { Request, Response } from 'express'
import {
  createCollaborator,
  listCollaborators,
  getCollaboratorById,
  updateCollaborator,
  deleteCollaborator,
} from '../services/collaborator.service.js'

export const CollaboratorController = {
  list: async (req: Request, res: Response): Promise<void> => {
    try {
      const collaborators = await listCollaborators()
      res.status(200).json(collaborators)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  getById: async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid collaborator ID' })
      return
    }
    try {
      const collaborator = await getCollaboratorById(id)
      if (!collaborator) {
        res.status(404).json({ error: 'Collaborator not found' })
        return
      }
      res.status(200).json(collaborator)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  create: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.body) {
        res.status(400).json({ error: 'Request body is empty' })
        return
      }
      const collaborator = await createCollaborator(req.body)
      res.status(201).json(collaborator)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid collaborator ID' })
      return
    }
    try {
      const collaborator = await updateCollaborator(id, req.body)
      res.status(200).json(collaborator)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  remove: async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid collaborator ID' })
      return
    }
    try {
      await deleteCollaborator(id)
      res.status(204).send()
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },
}
