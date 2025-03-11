import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { db } from '@/app/lib/db'
import { PromptCategory } from '@/types'

async function getStats(userId: string) {
  const stats = await db.query(`
    SELECT 
      category,
      COUNT(*) as count
    FROM prompts 
    WHERE user_id = $1 
    GROUP BY category
  `, [userId])

  const defaultStats: Record<PromptCategory, number> = {
    chat: 0,
    image: 0,
    code: 0,
    text: 0,
    audio: 0,
    video: 0,
  }

  const promptsByCategory = stats.rows.reduce((acc: Record<string, number>, row: any) => {
    acc[row.category] = parseInt(row.count)
    return acc
  }, defaultStats)

  const totalPrompts = Object.values(promptsByCategory).reduce((a, b) => a + b, 0)

  return {
    promptsByCategory,
    totalPrompts,
  }
}

export default async function DashboardPage() {
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

  const { promptsByCategory, totalPrompts } = await getStats(userResult.rows[0].id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Visão geral dos seus prompts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Total de Prompts</h3>
          <p className="text-3xl font-bold">{totalPrompts}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Prompts por Categoria</h3>
          <div className="space-y-2">
            {Object.entries(promptsByCategory).map(([category, count]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="capitalize">{category}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
          <div className="space-y-2">
            <a
              href="/prompts/new"
              className="block w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-center"
            >
              Novo Prompt
            </a>
            <a
              href="/prompts"
              className="block w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-center"
            >
              Ver Todos
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
