import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { SignUpForm } from '@/app/components/auth/SignUpForm'

export default async function SignUpPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div>
          <h1 className="text-center text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            PromptVault
          </h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
            Crie sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Comece a gerenciar seus prompts de IA de forma profissional
          </p>
        </div>

        <SignUpForm />
        
        <div className="text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Já tem uma conta?{' '}
            <a href="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              Entrar
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
