import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import pool from '@/lib/db'
import { STRIPE_PRODUCTS } from '@/config/plans'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    const { planId, interval = 'monthly' } = await req.json()

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Buscar usuário no banco
    const userResult = await pool.query(
      'SELECT id, stripeCustomerId FROM users WHERE email = $1',
      [session.user.email]
    )
    const user = userResult.rows[0]

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    let customerId = user.stripecustomerid

    // Criar ou atualizar cliente no Stripe
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        name: session.user.name || undefined
      })
      customerId = customer.id

      await pool.query(
        'UPDATE users SET stripeCustomerId = $1 WHERE id = $2',
        [customerId, user.id]
      )
    }

    // Criar checkout session
    const priceId = STRIPE_PRODUCTS[planId][interval]
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/precos`,
      metadata: {
        userId: user.id,
        planId
      }
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error)
    return NextResponse.json(
      { error: 'Erro ao processar assinatura' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession()

    if (!session?.user?.email?.includes('@promptvault.com.br')) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Buscar todas as assinaturas ativas
    const subscriptions = await stripe.subscriptions.list({
      status: 'active',
      expand: ['data.customer']
    })

    return NextResponse.json({ subscriptions: subscriptions.data })
  } catch (error) {
    console.error('Erro ao buscar assinaturas:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar assinaturas' },
      { status: 500 }
    )
  }
}
