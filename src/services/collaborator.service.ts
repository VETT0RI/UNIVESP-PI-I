import { PrismaClient, Prisma, Collaborator } from '@prisma/client'
import { CollaboratorData } from '../types/CollaboratorData.js'

const prisma = new PrismaClient()

export async function createCollaborator({
  department_id,
  ...fields
}: CollaboratorData): Promise<Collaborator> {
  const data: Prisma.CollaboratorCreateInput = {
    ...fields,
    department:
      department_id != null ? { connect: { id: department_id } } : undefined,
  }

  return prisma.collaborator.create({ data })
}

export async function listCollaborators(): Promise<Collaborator[]> {
  return prisma.collaborator.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function getCollaboratorById(
  id: number
): Promise<Collaborator | null> {
  return prisma.collaborator.findUnique({
    where: { id },
  })
}

export async function updateCollaborator(
  id: number,
  { department_id, ...fields }: CollaboratorData
): Promise<Collaborator> {
  const data: Prisma.CollaboratorUpdateInput = {
    ...fields,
    ...(department_id != null
      ? { departments: { connect: { id: department_id } } }
      : {}),
  }
  return prisma.collaborator.update({
    where: { id },
    data,
  })
}

export async function deleteCollaborator(id: number): Promise<Collaborator> {
  return prisma.collaborator.delete({
    where: { id },
  })
}
