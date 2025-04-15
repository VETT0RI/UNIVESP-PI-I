import { PrismaClient } from '@prisma/client'

// Estender o tipo de 'global' para permitir a propriedade 'prisma'
declare global {
  var prisma: PrismaClient | undefined
}

// Evita que o arquivo seja tratado como um módulo
export {}
