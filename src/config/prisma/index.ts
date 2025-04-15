import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient() // No modo de produção, cria uma nova instância a cada vez
} else {
  // No ambiente de desenvolvimento, usamos uma instância única para evitar múltiplas conexões
  if (!global.prisma) {
    global.prisma = new PrismaClient() // Associa ao objeto global
  }
  prisma = global.prisma
}

export { prisma }