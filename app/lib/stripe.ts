import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'
import { Plan } from './plans'

// Inicialização do Stripe no servidor
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// Inicialização do Stripe no cliente
export const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY!)

// Mapeamento de planos para produtos do Stripe
export const STRIPE_PRODUCTS = {
  free: {
    monthly: 'price_free_monthly',
    yearly: 'price_free_yearly'
  },
  pro: {
    monthly: 'price_pro_monthly',
    yearly: 'price_pro_yearly'
  },
  enterprise: {
    monthly: 'price_enterprise_monthly',
    yearly: 'price_enterprise_yearly'
  }
}

// Função para criar uma sessão de checkout
export async function createCheckoutSession(planId: string, period: 'monthly' | 'yearly') {
  const priceId = STRIPE_PRODUCTS[planId as keyof typeof STRIPE_PRODUCTS][period]
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/precos`,
  })

  return session
}

// Função para gerenciar portal do cliente
export async function createCustomerPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXTAUTH_URL}/conta`,
  })

  return session
}

// Função para cancelar assinatura
export async function cancelSubscription(subscriptionId: string) {
  return await stripe.subscriptions.cancel(subscriptionId)
}

// Função para atualizar assinatura
export async function updateSubscription(
  subscriptionId: string,
  planId: string,
  period: 'monthly' | 'yearly'
) {
  const priceId = STRIPE_PRODUCTS[planId as keyof typeof STRIPE_PRODUCTS][period]

  return await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscriptionId,
        price: priceId,
      },
    ],
  })
}

// Função para verificar status da assinatura
export async function getSubscriptionStatus(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  return subscription.status
}

// Webhook handler para eventos do Stripe
export async function handleStripeWebhook(event: Stripe.Event) {
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription
      // TODO: Atualizar status da assinatura no banco de dados
      break
      
    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice
      // TODO: Atualizar registro de pagamento no banco de dados
      break
      
    case 'invoice.payment_failed':
      const failedInvoice = event.data.object as Stripe.Invoice
      // TODO: Notificar usuário sobre falha no pagamento
      break
  }
}
