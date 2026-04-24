// scripts/seed.ts
import 'dotenv/config' // ← ОБЯЗАТЕЛЬНО: загружает .env перед всем остальным!

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import bcrypt from 'bcrypt'

// 🔍 Дебаг: проверяем, загрузилась ли переменная
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not defined in environment!')
  console.error('Current env keys:', Object.keys(process.env).filter(k => k.includes('DB') || k.includes('DATABASE')))
  process.exit(1)
}

// Создаем пул подключений с явными параметрами (надёжнее, чем connectionString)
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'godmode_db',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'securepassword123',
}

const pool = new pg.Pool(dbConfig)
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter, log: ['query'] })

async function main() {
  console.log('🌱 Start seeding...')
  console.log(`🔗 Connected to: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`)

  const passwordHash = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@godmode.com' },
    update: {},
    create: {
      email: 'admin@godmode.com',
      passwordHash,
      role: 'ADMIN',
      telegramName: 'Founder',
    },
  })
  console.log(`✅ Created admin: ${admin.email}`)

  const post = await prisma.post.create({
    data: {  // ← Обратите внимание: здесь должен быть ключ 'data'
      title: 'Первый урок: Введение',
      content: 'Добро пожаловать в закрытый клуб...',
      isPremium: true,
      authorId: admin.id,
    },
  })
  console.log(`✅ Created post: ${post.title}`)

  console.log('✨ Seeding finished.')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end() // Обязательно закрываем пул!
  })