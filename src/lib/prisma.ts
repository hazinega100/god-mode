import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Создаем пул подключений
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})

// Создаем адаптер
const adapter = new PrismaPg(pool)

// Экспортируем клиент с адаптером
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ 
    adapter,
    log: ['query'], 
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}