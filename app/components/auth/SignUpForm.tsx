'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function SignUpForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      console.error('Erro ao entrar com Google:', error)
      setError('Falha ao conectar com Google. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Estamos em fase de testes. Por enquanto, apenas o login com Google está disponível.
        </p>
      </div>

      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-indigo-600 dark:border-indigo-400 border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                fill="currentColor"
              />
            </svg>
            Entrar com Google
          </>
        )}
      </button>
    </div>
  )
}
