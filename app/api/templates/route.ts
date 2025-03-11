import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const templates = await prisma.template.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    })
    return NextResponse.json(templates)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar templates' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, structure, category } = body

    const template = await prisma.template.create({
      data: {
        name,
        description,
        structure,
        category,
      },
    })

    return NextResponse.json(template)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar template' },
      { status: 500 }
    )
  }
}
