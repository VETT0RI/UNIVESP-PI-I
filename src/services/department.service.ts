import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function listDepartments() {
  return prisma.department.findMany({
    orderBy: { name: 'asc' },
  })
}
