import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { db } from '@/app/lib/db'

async function getUserSettings(userId: string) {
  const result = await db.query(`
    SELECT 
      theme,
      language,
      notifications,
      default_model
    FROM user_settings 
    WHERE user_id = $1
  `, [userId])

  return result.rows[0] || {
    theme: 'light',
    language: 'pt',
    notifications: true,
    default_model: 'gpt-3.5-turbo',
  }
}

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  const userResult = await db.query(
    'SELECT id FROM users WHERE email = $1',
    [session.user?.email]
  )

  if (!userResult.rows[0]) {
    redirect('/api/auth/signin')
  }

  const settings = await getUserSettings(userResult.rows[0].id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Configurações
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Personalize sua experiência
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Aparência</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Tema
              </label>
              <select
                defaultValue={settings.theme}
                className="w-full rounded-lg border p-2 bg-white dark:bg-gray-900"
              >
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
                <option value="system">Sistema</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Idioma
              </label>
              <select
                defaultValue={settings.language}
                className="w-full rounded-lg border p-2 bg-white dark:bg-gray-900"
              >
                <option value="pt">Português</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Notificações</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={settings.notifications}
                className="rounded border-gray-300"
              />
              <label className="ml-2">
                Receber notificações
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Modelo Padrão</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Modelo de IA
              </label>
              <select
                defaultValue={settings.default_model}
                className="w-full rounded-lg border p-2 bg-white dark:bg-gray-900"
              >
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4">GPT-4</option>
                <option value="claude-2">Claude 2</option>
                <option value="claude-3">Claude 3</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  )
}
