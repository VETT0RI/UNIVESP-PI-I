import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import {
  createCollaborator,
  listCollaborators,
  getCollaboratorById,
  updateCollaborator,
  deleteCollaborator,
} from '../services/collaborator.service.js'
import {
  Department,
  Dependent,
  Documents,
  EmergencyContact,
  TransportationVoucher,
  Vehicle,
} from '@prisma/client'

const upload = multer({ storage: multer.memoryStorage() })

interface CollaboratorData {
  id: number
  name: string
  department_id?: number | null
  status: string
  photo: string | null
  social_name: string
  sex: string
  nationality: string
  birthplace: string
  state: string
  marital_status: string
  t_shirt_size: string
  personal_email: string
  phone_number: string
  date_of_birth: string
  ethnicity: string
  cpf_number: string
  rg_number: string
  rg_issuing_body: string
  rg_state: string
  rg_issue_date: string
  address: string
  residence_number: number
  complement: string
  neighborhood: string
  city: string
  cep: string
  mother_name: string
  father_name: string
  pis_number: string
  pis_registration_date?: string | null
  has_itau_account?: boolean | null
  itau_account?: string | null
  itau_agency?: string | null
  has_cnpj?: boolean | null
  cnpj_corporate_name?: string | null
  cnpj_bank_details?: string | null
  has_disability: boolean
  start_date: string
  voter_registration_number?: string | null
  voter_registration_zone?: string | null
  voter_registration_section?: string | null
  reservist_number?: string | null
  reservist_category?: string | null
  education: string
  training_course?: string | null
  course_completion_date?: string | null
  corporate_email?: string | null
  type_of_contract: string
  position?: string | null
  level?: string | null
  leads_team?: boolean | null
  has_dependents: boolean
  will_use_vt?: boolean | null
  will_use_parking?: boolean | null
  number_of_dependents?: number | null
  createdAt: string
  updatedAt: string
  department?: Department
  dependents?: Dependent[]
  documents?: Documents[]
  emergency_contacts?: EmergencyContact[]
  transportation_voucher?: TransportationVoucher[]
  vehicles?: Vehicle[]
}

function transformCollaboratorForAPI(collaborator: any): CollaboratorData {
  const c = { ...collaborator }
  if (typeof c.voter_registration_number === 'bigint') {
    c.voter_registration_number = c.voter_registration_number.toString()
  }
  if (c.date_of_birth instanceof Date) {
    c.date_of_birth = c.date_of_birth.toISOString()
  }
  if (c.rg_issue_date instanceof Date) {
    c.rg_issue_date = c.rg_issue_date.toISOString()
  }
  if (c.pis_registration_date instanceof Date) {
    c.pis_registration_date = c.pis_registration_date.toISOString()
  }
  if (c.start_date instanceof Date) {
    c.start_date = c.start_date.toISOString()
  }
  if (c.course_completion_date instanceof Date) {
    c.course_completion_date = c.course_completion_date.toISOString()
  }
  if (c.shutdown_date instanceof Date) {
    c.shutdown_date = c.shutdown_date.toISOString()
  }
  if (c.createdAt instanceof Date) {
    c.createdAt = c.createdAt.toISOString()
  }
  if (c.updatedAt instanceof Date) {
    c.updatedAt = c.updatedAt.toISOString()
  }
  return c as CollaboratorData
}

export const CollaboratorController = {
  list: async (_req: Request, res: Response) => {
    try {
      const all = await listCollaborators()
      res.json(all.map(transformCollaboratorForAPI))
    } catch (error: any) {
      console.error('Erro ao listar colaboradores:', error)
      res.status(500).json({ error: error.message || 'Internal Server Error' })
    }
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid collaborator ID' })
      return
    }
    try {
      const one = await getCollaboratorById(id)
      if (!one) {
        res.status(404).json({ error: 'Collaborator not found' })
        return
      }
      res.json(transformCollaboratorForAPI(one))
    } catch (error: any) {
      console.error(`Erro ao buscar colaborador ${id}:`, error)
      res.status(500).json({ error: error.message || 'Internal Server Error' })
    }
  },

  create: [
    upload.single('photo'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.body || Object.keys(req.body).length === 0) {
          res.status(400).json({ error: 'Request body is empty or invalid' })
          return
        }
        const payload = { ...req.body, photoFile: req.file }
        const created = await createCollaborator(payload)
        res.status(201).json(transformCollaboratorForAPI(created))
      } catch (error: any) {
        console.error('Erro em CollaboratorController.create:', error)
        next(error)
      }
    },
  ],

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid collaborator ID' })
      return
    }
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'Request body is empty or invalid' })
        return
      }
      if (
        req.body.voter_registration_number &&
        typeof req.body.voter_registration_number === 'string'
      ) {
        try {
          req.body.voter_registration_number = BigInt(
            req.body.voter_registration_number
          )
        } catch {
          res
            .status(400)
            .json({ error: 'Invalid format for voter_registration_number' })
          return
        }
      }
      const updated = await updateCollaborator(id, req.body)
      res.json(transformCollaboratorForAPI(updated))
    } catch (error: any) {
      console.error(`Erro ao atualizar colaborador ${id}:`, error)
      res.status(500).json({ error: error.message || 'Internal Server Error' })
    }
  },

  remove: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid collaborator ID' })
      return
    }
    try {
      await deleteCollaborator(id)
      res.status(204).send()
    } catch (error: any) {
      console.error(`Erro ao remover colaborador ${id}:`, error)
      res.status(500).json({ error: error.message || 'Internal Server Error' })
    }
  },
}
