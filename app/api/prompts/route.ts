import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { db } from '@/app/lib/db'
import { Prompt } from '@/types'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const query = searchParams.get('query')

    let sql = `
      SELECT * FROM prompts 
      WHERE user_id = (SELECT id FROM users WHERE email = $1)
    `
    const params: any[] = [session.user.email]

    if (category) {
      sql += ` AND category = $${params.length + 1}`
      params.push(category)
    }

    if (query) {
      sql += ` AND (
        title ILIKE $${params.length + 1} OR
        prompt_pt ILIKE $${params.length + 1} OR
        prompt_en ILIKE $${params.length + 1} OR
        tags && ARRAY[$${params.length + 1}]
      )`
      params.push(`%${query}%`)
    }

    sql += ' ORDER BY created_at DESC'

    const result = await db.query(sql, params)
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching prompts:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const {
      title,
      promptPt,
      promptEn,
      category,
      tags,
      model,
      ...specificFields
    } = data as Prompt

    // Validação básica
    if (!title || !promptPt || !promptEn || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
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
      `INSERT INTO prompts (
        user_id,
        title,
        prompt_pt,
        prompt_en,
        category,
        tags,
        model,
        specific_fields,
        created_at,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
      RETURNING *`,
      [
        userId.rows[0].id,
        title,
        promptPt,
        promptEn,
        category,
        tags,
        model,
        specificFields
      ]
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error creating prompt:', error)
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
    const { id, ...updateData } = data as Prompt & { id: string }

    if (!id) {
      return NextResponse.json(
        { error: 'Missing prompt ID' },
        { status: 400 }
      )
    }

    // Verifica se o prompt pertence ao usuário
    const ownership = await db.query(
      `SELECT p.id FROM prompts p
       JOIN users u ON p.user_id = u.id
       WHERE p.id = $1 AND u.email = $2`,
      [id, session.user.email]
    )

    if (!ownership.rows[0]) {
      return NextResponse.json(
        { error: 'Prompt not found or unauthorized' },
        { status: 404 }
      )
    }

    const {
      title,
      promptPt,
      promptEn,
      category,
      tags,
      model,
      ...specificFields
    } = updateData

    const result = await db.query(
      `UPDATE prompts
       SET title = $1,
           prompt_pt = $2,
           prompt_en = $3,
           category = $4,
           tags = $5,
           model = $6,
           specific_fields = $7,
           updated_at = NOW()
       WHERE id = $8
       RETURNING *`,
      [
        title,
        promptPt,
        promptEn,
        category,
        tags,
        model,
        specificFields,
        id
      ]
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error updating prompt:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Missing prompt ID' },
        { status: 400 }
      )
    }

    // Verifica se o prompt pertence ao usuário
    const ownership = await db.query(
      `SELECT p.id FROM prompts p
       JOIN users u ON p.user_id = u.id
       WHERE p.id = $1 AND u.email = $2`,
      [id, session.user.email]
    )

    if (!ownership.rows[0]) {
      return NextResponse.json(
        { error: 'Prompt not found or unauthorized' },
        { status: 404 }
      )
    }

    await db.query('DELETE FROM prompts WHERE id = $1', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting prompt:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
