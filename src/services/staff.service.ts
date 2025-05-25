import * as bcrypt from 'bcrypt'
import { prisma } from '../config/prisma/index.js'

type Staff = {
  id: string
  email: string
  password: string
}

const createStaff = async (data: Staff) => {
  const new_staff = await prisma.staff.create({
    data: {
      id: data.id,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
    },
  })

  const { password, ...staffWithoutPassword } = new_staff

  return staffWithoutPassword
}

const listStaff = async () => {
  const staff_list = await prisma.staff.findMany({
    select: {
      id: true,
      email: true,
    },
  })

  return staff_list
}

const findByEmail = async (email: string) => {
  const staff = await prisma.staff.findUnique({
    where: {
      email,
    },
  })

  return staff
}

export const StaffService = {
  create: createStaff,
  list: listStaff,
  findByEmail,
}
