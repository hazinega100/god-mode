import { prisma } from '@/lib/prisma'
import { User, Subscription } from '@prisma/client'

export async function activateSubscription(
  userId: string, 
  planType: 'monthly' | 'yearly' | 'lifetime'
): Promise<Subscription> {
  const now = new Date()
  const endsAt = planType === 'lifetime' 
    ? null 
    : new Date(now.setMonth(now.getMonth() + (planType === 'monthly' ? 1 : 12)))

  return prisma.subscription.upsert({
    where: { userId },
    update: {
      status: 'ACTIVE',
      planType,
      startedAt: now,
      endsAt,
    },
    create: {
      userId,
      status: 'ACTIVE',
      planType,
      startedAt: now,
      endsAt,
    },
  })
}

export async function checkAccess(userId: string): Promise<boolean> {
  const sub = await prisma.subscription.findUnique({
    where: { userId },
    select: { status: true, endsAt: true }
  })
  
  if (!sub) return false
  if (sub.status !== 'ACTIVE') return false
  if (sub.endsAt && new Date(sub.endsAt) < new Date()) return false
  
  return true
}