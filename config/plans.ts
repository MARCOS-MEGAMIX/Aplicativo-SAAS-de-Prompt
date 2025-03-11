import { Plan, PlanType } from '@/types'

export const PLANS: Record<PlanType, Plan> = {
  free: {
    name: 'Free',
    promptLimit: 100,
    features: [
      'Até 100 prompts por mês',
      'Acesso a prompts de chat e texto',
      'Biblioteca básica de templates',
      'Tradução PT-EN',
      'Armazenamento de prompts',
      'Categorização básica'
    ],
    price: {
      monthly: 0,
      yearly: 0
    }
  },
  pro: {
    name: 'Pro',
    promptLimit: 500,
    features: [
      'Até 500 prompts por mês',
      'Todos os tipos de prompts',
      'Biblioteca completa de templates',
      'Tradução avançada',
      'Análise de IA',
      'Categorização automática',
      'Versionamento de prompts',
      'Suporte por email'
    ],
    price: {
      monthly: 29,
      yearly: 290
    }
  },
  enterprise: {
    name: 'Enterprise',
    promptLimit: -1, // ilimitado
    features: [
      'Prompts ilimitados',
      'Todos os recursos Pro',
      'API dedicada',
      'Treinamento personalizado',
      'Suporte prioritário',
      'Gerenciamento de equipe',
      'Customização de templates',
      'Relatórios avançados'
    ],
    price: {
      monthly: 99,
      yearly: 990
    }
  }
}

export const STRIPE_PRODUCTS = {
  free: {
    monthly: process.env.STRIPE_PRICE_FREE,
    yearly: process.env.STRIPE_PRICE_FREE
  },
  pro: {
    monthly: process.env.STRIPE_PRICE_PRO,
    yearly: process.env.STRIPE_PRICE_PRO_YEARLY
  },
  enterprise: {
    monthly: process.env.STRIPE_PRICE_ENTERPRISE,
    yearly: process.env.STRIPE_PRICE_ENTERPRISE_YEARLY
  }
}
