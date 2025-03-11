import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { db } from '@/app/lib/db'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [session.user.email]
    )

    if (!userId.rows[0]) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const result = await db.query(
      `SELECT 
        theme,
        language,
        notifications,
        default_model
      FROM user_settings 
      WHERE user_id = $1`,
      [userId.rows[0].id]
    )

    const settings = result.rows[0] || {
      theme: 'light',
      language: 'pt',
      notifications: true,
      default_model: 'gpt-3.5-turbo',
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const { theme, language, notifications, default_model } = data

    const userId = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [session.user.email]
    )

    if (!userId.rows[0]) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const result = await db.query(
      `INSERT INTO user_settings (
        user_id,
        theme,
        language,
        notifications,
        default_model,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, NOW())
      ON CONFLICT (user_id) 
      DO UPDATE SET
        theme = $2,
        language = $3,
        notifications = $4,
        default_model = $5,
        updated_at = NOW()
      RETURNING *`,
      [
        userId.rows[0].id,
        theme,
        language,
        notifications,
        default_model,
      ]
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
