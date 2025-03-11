import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import pool from '@/lib/db'
import { PLANS } from '@/config/plans'

async function getAdminData() {
  const usersQuery = await pool.query(`
    SELECT 
      u.id, 
      u.name, 
      u.email,
      u.planId,
      u.stripeCustomerId,
      u.subscriptionId, 
      ul.promptsUsed,
      ul.imagesUsed,
      ul.promptLimit,
      ul.imageLimit,
      u.created_at as joinDate
    FROM users u
    LEFT JOIN usage_limits ul ON u.id = ul.user_id
    ORDER BY u.created_at DESC
  `)

  const promptsQuery = await pool.query(`
    SELECT 
      COUNT(*) as totalPrompts,
      COUNT(CASE WHEN category = 'chat' THEN 1 END) as chatPrompts,
      COUNT(CASE WHEN category = 'image' THEN 1 END) as imagePrompts,
      COUNT(CASE WHEN category = 'code' THEN 1 END) as codePrompts,
      COUNT(CASE WHEN category = 'text' THEN 1 END) as textPrompts,
      COUNT(CASE WHEN category = 'audio' THEN 1 END) as audioPrompts,
      COUNT(CASE WHEN category = 'video' THEN 1 END) as videoPrompts
    FROM prompts
  `)

  const metricsQuery = await pool.query(`
    SELECT 
      COUNT(*) as totalUsers,
      COUNT(CASE WHEN planId = 'free' THEN 1 END) as freePlan,
      COUNT(CASE WHEN planId = 'pro' THEN 1 END) as proPlan,
      COUNT(CASE WHEN planId = 'enterprise' THEN 1 END) as enterprisePlan,
      SUM(promptsUsed) as totalPromptsUsed,
      SUM(imagesUsed) as totalImagesUsed
    FROM users u
    LEFT JOIN usage_limits ul ON u.id = ul.user_id
  `)

  return {
    users: usersQuery.rows,
    prompts: promptsQuery.rows[0],
    metrics: metricsQuery.rows[0]
  }
}

export default async function AdminDashboard() {
  const session = await getServerSession()
  
  // Verificar se o usuário é admin
  if (!session?.user?.email?.includes('@promptvault.com.br')) {
    redirect('/')
  }

  const { users, prompts, metrics } = await getAdminData()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard Administrativa</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-medium">Total de Usuários</h3>
          <p className="text-3xl font-bold">{metrics.totalUsers}</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium">Total de Prompts</h3>
          <p className="text-3xl font-bold">{prompts.totalPrompts}</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium">Prompts Ativos</h3>
          <p className="text-3xl font-bold">{metrics.totalPromptsUsed}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-medium">Plano Free</h3>
          <p className="text-3xl font-bold">{metrics.freePlan}</p>
          <p className="text-sm text-gray-500">usuários</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium">Plano Pro</h3>
          <p className="text-3xl font-bold">{metrics.proPlan}</p>
          <p className="text-sm text-gray-500">usuários</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium">Plano Enterprise</h3>
          <p className="text-3xl font-bold">{metrics.enterprisePlan}</p>
          <p className="text-sm text-gray-500">usuários</p>
        </Card>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Prompts por Categoria</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium">Chat/Conversação</h4>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{prompts.chatprompts}</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h4 className="font-medium">Geração de Imagens</h4>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{prompts.imageprompts}</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-medium">Código/Programação</h4>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{prompts.codeprompts}</p>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h4 className="font-medium">Texto/Redação</h4>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{prompts.textprompts}</p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h4 className="font-medium">Áudio/Música</h4>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{prompts.audioprompts}</p>
          </div>
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <h4 className="font-medium">Vídeo/Animação</h4>
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{prompts.videoprompts}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Usuários e Assinaturas</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>ID Stripe</TableHead>
              <TableHead>Prompts Usados</TableHead>
              <TableHead>Limite Prompts</TableHead>
              <TableHead>Data Cadastro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.planid === 'free' ? 'bg-gray-100 text-gray-800' :
                    user.planid === 'pro' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {PLANS[user.planid]?.name || 'Free'}
                  </span>
                </TableCell>
                <TableCell>{user.stripecustomerid || '-'}</TableCell>
                <TableCell>{user.promptsused}</TableCell>
                <TableCell>{user.promptlimit}</TableCell>
                <TableCell>
                  {new Date(user.joindate).toLocaleDateString('pt-BR')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
