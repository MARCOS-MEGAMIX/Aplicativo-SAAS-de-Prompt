import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import pool from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const result = await pool.query(
      `SELECT users.*, 
              user_settings.*, 
              usage_limits.*
       FROM users 
       LEFT JOIN user_settings ON users.id = user_settings.user_id
       LEFT JOIN usage_limits ON users.id = usage_limits.user_id
       WHERE users.email = $1`,
      [session.user.email]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const data = await request.json()

    const result = await pool.query(
      `WITH updated_user AS (
         UPDATE users 
         SET name = $1
         WHERE email = $2
         RETURNING id
       ),
       updated_settings AS (
         UPDATE user_settings 
         SET theme = $3,
             language = $4,
             notifications = $5,
             default_model = $6
         WHERE user_id = (SELECT id FROM updated_user)
         RETURNING *
       )
       SELECT users.*, updated_settings.*
       FROM users 
       LEFT JOIN updated_settings ON users.id = updated_settings.user_id
       WHERE users.email = $2`,
      [
        data.name,
        session.user.email,
        data.settings?.theme,
        data.settings?.language,
        data.settings?.notifications,
        data.settings?.defaultModel
      ]
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    await pool.query(
      'DELETE FROM users WHERE email = $1',
      [session.user.email]
    )

    return NextResponse.json({ message: 'Usuário excluído com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir usuário:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
