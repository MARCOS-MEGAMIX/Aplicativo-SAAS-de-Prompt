'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface Plan {
  name: string
  promptLimit: number
  imageLimit: number
}

interface Usage {
  promptsUsed: number
  imagesUsed: number
}

interface SubscriptionData {
  currentPlan: Plan | null
  currentUsage: Usage | null
  isLoading: boolean
  error: Error | null
}

export function useSubscription(): SubscriptionData {
  const { data: session, status } = useSession()
  const [data, setData] = useState<SubscriptionData>({
    currentPlan: null,
    currentUsage: null,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    async function fetchSubscriptionData() {
      try {
        if (status === 'loading' || !session) {
          return
        }

        const response = await fetch('/api/user')
        if (!response.ok) {
          throw new Error('Erro ao buscar dados da assinatura')
        }

        const userData = await response.json()
        
        setData({
          currentPlan: {
            name: userData.planId === 'free' ? 'Plano Free' : 'Plano Pro',
            promptLimit: userData.usageLimit.promptLimit,
            imageLimit: userData.usageLimit.imageLimit
          },
          currentUsage: {
            promptsUsed: userData.usageLimit.promptsUsed,
            imagesUsed: userData.usageLimit.imagesUsed
          },
          isLoading: false,
          error: null
        })
      } catch (error) {
        setData(prev => ({
          ...prev,
          isLoading: false,
          error: error as Error
        }))
      }
    }

    fetchSubscriptionData()
  }, [session, status])

  return data
}

export default useSubscription
