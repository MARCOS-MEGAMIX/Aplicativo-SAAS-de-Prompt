export interface Plan {
  id: string
  name: string
  description: string
  price: number
  features: string[]
  limits: {
    promptsPerMonth: number
    imagesPerMonth: number
    aiAnalysis: boolean
    advancedFeatures: boolean
    priority: boolean
  }
}

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Gratuito',
    description: 'Perfeito para começar',
    price: 0,
    features: [
      'Até 50 prompts por mês',
      'Até 10 imagens por mês',
      'Biblioteca básica',
      'Tradução automática',
    ],
    limits: {
      promptsPerMonth: 50,
      imagesPerMonth: 10,
      aiAnalysis: false,
      advancedFeatures: false,
      priority: false
    }
  },
  {
    id: 'pro',
    name: 'Profissional',
    description: 'Para usuários avançados',
    price: 29.90,
    features: [
      'Até 500 prompts por mês',
      'Até 100 imagens por mês',
      'Análise de IA avançada',
      'Recursos avançados',
      'Templates ilimitados',
      'Prioridade no suporte'
    ],
    limits: {
      promptsPerMonth: 500,
      imagesPerMonth: 100,
      aiAnalysis: true,
      advancedFeatures: true,
      priority: false
    }
  },
  {
    id: 'enterprise',
    name: 'Empresarial',
    description: 'Para equipes e empresas',
    price: 99.90,
    features: [
      'Prompts ilimitados',
      'Imagens ilimitadas',
      'Análise de IA avançada',
      'Todos os recursos avançados',
      'API access',
      'Suporte prioritário 24/7',
      'Treinamento personalizado'
    ],
    limits: {
      promptsPerMonth: -1, // ilimitado
      imagesPerMonth: -1, // ilimitado
      aiAnalysis: true,
      advancedFeatures: true,
      priority: true
    }
  }
]

export function getPlanById(id: string): Plan | undefined {
  return plans.find(plan => plan.id === id)
}

export function isPlanFeatureAvailable(plan: Plan, feature: keyof Plan['limits']): boolean {
  if (typeof plan.limits[feature] === 'boolean') {
    return plan.limits[feature] as boolean
  }
  return false
}

export function getMonthlyLimit(plan: Plan, limit: 'promptsPerMonth' | 'imagesPerMonth'): number {
  return plan.limits[limit]
}
