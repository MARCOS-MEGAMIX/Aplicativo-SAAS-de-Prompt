'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AnimatedContainer from '../components/AnimatedContainer'
import { LogIn } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const result = await signIn('google', {
        callbackUrl: '/',
        redirect: false
      })

      if (result?.error) {
        setError('Erro ao fazer login com Google')
      } else if (result?.url) {
        router.push(result.url)
      }
    } catch (error) {
      setError('Ocorreu um erro inesperado')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatedContainer>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Bem-vindo ao PromptVault
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Faça login para gerenciar seus prompts
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span>Continuar com Google</span>
                </>
              )}
            </button>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ao fazer login, você concorda com nossos{' '}
                <a
                  href="/termos"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Termos de Uso
                </a>{' '}
                e{' '}
                <a
                  href="/privacidade"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Política de Privacidade
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Precisa de ajuda?{' '}
              <a
                href="mailto:suporte@promptvault.com.br"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                Entre em contato
              </a>
            </p>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  )
}
