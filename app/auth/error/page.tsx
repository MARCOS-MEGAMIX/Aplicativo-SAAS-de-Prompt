import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Erro de Autenticação
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Ocorreu um erro durante a autenticação. Por favor, tente novamente.
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            href="/auth/signin"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  )
}
