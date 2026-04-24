'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function PremiumGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?redirect=/dashboard')
    }
    // Можно добавить проверку isActiveSubscription здесь
  }, [status, router])

  if (status === 'loading') return <div>Загрузка...</div>
  if (!session) return null

  return <>{children}</>
}