import { StaffService } from '../services/staff.service.js'
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createStaffSchema, staffSchema } from '../schemas/staff.schema.js'

const listStaffController = async (request: Request, response: Response) => {
  try {
    const staff_list = await StaffService.list()
    response.status(200).json(staff_list)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Internal Server Error' })
  }
}

const createStaffController = async (request: Request, response: Response) => {
  try {
    if (!request.body) throw new Error('Request body is empty')
    const { email, password } = request.body

    if (!email || !password) {
      response.status(400).json({ error: 'Email and password are required' })
      return
    }
    const staff = await StaffService.create({ id: uuidv4(), email, password })
    response.status(201).json(staff)
    return
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Internal Server Error' })
    return
  }
}

export const StaffController = {
  create: createStaffController,
  list: listStaffController,
}
