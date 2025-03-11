'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { PLANS } from '@/config/plans'

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const planId = searchParams.get('plan') || 'pro'
  const interval = searchParams.get('interval') || 'monthly'
  
  const plan = PLANS[planId as keyof typeof PLANS]
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth/signin?callbackUrl=/precos/checkout?plan=${planId}&interval=${interval}`)
    }
  }, [status, router, planId, interval])
  
  const handleCheckout = async () => {
    if (status !== 'authenticated') {
      router.push(`/auth/signin?callbackUrl=/precos/checkout?plan=${planId}&interval=${interval}`)
      return
    }
    
    try {
      setLoading(true)
      setError('')
      
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          interval,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar pagamento')
      }
      
      // Redirecionar para o checkout do Stripe
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error: any) {
      console.error('Erro no checkout:', error)
      setError(error.message || 'Falha ao processar pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }
  
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Finalizar Assinatura</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Você está prestes a assinar o plano {plan.name}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Resumo do Pedido</h2>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {interval === 'yearly' ? 'Anual' : 'Mensal'}
                </span>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 py-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Plano</span>
                  <span className="font-medium text-gray-900 dark:text-white">{plan.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Preço</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    R$ {interval === 'yearly' ? plan.price.yearly : plan.price.monthly}
                    {interval === 'yearly' ? '/ano' : '/mês'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Limite de prompts</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {plan.promptLimit === -1 ? 'Ilimitado' : `${plan.promptLimit}/mês`}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 py-4">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">O que está incluído:</h3>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div className="mt-8 space-y-4">
                <button
                  onClick={handleCheckout}
                  disabled={loading || status !== 'authenticated'}
                  className="w-full btn-primary py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                  ) : (
                    `Assinar por R$ ${interval === 'yearly' ? plan.price.yearly : plan.price.monthly}${interval === 'yearly' ? '/ano' : '/mês'}`
                  )}
                </button>
                
                <div className="text-center">
                  <Link href="/precos" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Voltar para planos
                  </Link>
                </div>
              </div>
              
              <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                Ao assinar, você concorda com nossos{' '}
                <Link href="/termos" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Termos de Serviço
                </Link>{' '}
                e{' '}
                <Link href="/privacidade" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Política de Privacidade
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
