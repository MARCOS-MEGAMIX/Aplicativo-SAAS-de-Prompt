import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe, handleStripeWebhook } from '../../../lib/stripe'
import type { Stripe } from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    await handleStripeWebhook(event)

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Error processing webhook:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }
}
