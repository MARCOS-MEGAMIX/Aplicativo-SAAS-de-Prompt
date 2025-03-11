import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { db } from '@/app/lib/db'
import { PromptList } from '@/app/components/prompt/PromptList'

async function getPromptStats(userId: string) {
  const stats = await db.query(`
    SELECT 
      category,
      COUNT(*) as count
    FROM prompts 
    WHERE user_id = $1 
    GROUP BY category
  `, [userId])

  return stats.rows
}

export default async function BibliotecaPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  const userResult = await db.query(
    'SELECT id FROM users WHERE email = $1',
    [session.user?.email]
  )

  if (!userResult.rows[0]) {
    redirect('/auth/signin')
  }

  const stats = await getPromptStats(userResult.rows[0].id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Biblioteca de Prompts
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gerencie e organize seus prompts por categoria
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat: any) => (
          <div key={stat.category} className="card p-6">
            <h3 className="text-lg font-semibold capitalize mb-2">
              {stat.category}
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {stat.count}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              prompts cadastrados
            </p>
          </div>
        ))}
      </div>

      <PromptList />
    </div>
  )
}
