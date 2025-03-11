'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import AnimatedContainer from '../components/AnimatedContainer'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (!sessionId) {
      setError('ID da sessão não encontrado')
      setIsLoading(false)
      return
    }

    // TODO: Verificar status da sessão no Stripe
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [searchParams])

  if (isLoading) {
    return (
      <AnimatedContainer>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Confirmando seu pagamento...
            </p>
          </div>
        </div>
      </AnimatedContainer>
    )
  }

  if (error) {
    return (
      <AnimatedContainer>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">×</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ops! Algo deu errado
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{error}</p>
            <Link
              href="/precos"
              className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline"
            >
              Voltar para planos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </AnimatedContainer>
    )
  }

  return (
    <AnimatedContainer>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-6">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Pagamento Confirmado!
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            Seu plano foi atualizado com sucesso. Aproveite todos os recursos premium do PromptVault!
          </p>

          <div className="space-y-4">
            <Link
              href="/biblioteca"
              className="block w-full sm:w-auto sm:inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors"
            >
              Começar a Usar
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <div>
              <Link
                href="/conta"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
              >
                Gerenciar assinatura
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  )
}
