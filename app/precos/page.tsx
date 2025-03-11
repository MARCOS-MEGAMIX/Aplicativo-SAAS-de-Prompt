'use client'

import { useState } from 'react'
import { plans } from '../lib/plans'
import AnimatedContainer from '../components/AnimatedContainer'
import { Check, Star } from 'lucide-react'

export default function PrecosPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const getPrice = (basePrice: number) => {
    if (billingPeriod === 'yearly') {
      return (basePrice * 10).toFixed(2) // 2 meses grátis no plano anual
    }
    return basePrice.toFixed(2)
  }

  return (
    <AnimatedContainer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Planos e Preços
          </h1>
          <p className="mt-5 text-xl text-gray-500 dark:text-gray-300">
            Escolha o plano ideal para suas necessidades
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="relative self-center rounded-lg bg-gray-100 dark:bg-gray-800 p-0.5">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`relative w-32 whitespace-nowrap rounded-md py-2 text-sm font-medium ${
                billingPeriod === 'monthly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`relative w-32 whitespace-nowrap rounded-md py-2 text-sm font-medium ${
                billingPeriod === 'yearly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Anual
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                2 meses grátis
              </span>
            </button>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-gray-900/10 dark:ring-gray-700 p-8 ${
                plan.id === 'pro' ? 'scale-105 z-10' : ''
              }`}
            >
              {plan.id === 'pro' && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-1 text-white">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-medium">Mais Popular</span>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">{plan.description}</p>
              </div>

              <div className="mb-8">
                <p className="flex items-baseline">
                  <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    R$ {getPrice(plan.price)}
                  </span>
                  <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    /{billingPeriod === 'monthly' ? 'mês' : 'ano'}
                  </span>
                </p>
              </div>

              <ul className="space-y-4 text-sm">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold ${
                    plan.id === 'pro'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                      : 'bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600'
                  }`}
                >
                  {plan.id === 'enterprise' ? 'Fale Conosco' : 'Começar Agora'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Perguntas Frequentes
          </h2>
          <dl className="mt-12 space-y-10 text-left">
            <div>
              <dt className="text-lg font-semibold text-gray-900 dark:text-white">
                Como funciona o período de teste?
              </dt>
              <dd className="mt-3 text-gray-500 dark:text-gray-400">
                Oferecemos 14 dias de teste gratuito em qualquer plano. Você pode cancelar a qualquer momento durante este período.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-gray-900 dark:text-white">
                Posso mudar de plano depois?
              </dt>
              <dd className="mt-3 text-gray-500 dark:text-gray-400">
                Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. A diferença será calculada proporcionalmente.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-gray-900 dark:text-white">
                Como funciona o plano empresarial?
              </dt>
              <dd className="mt-3 text-gray-500 dark:text-gray-400">
                O plano empresarial é personalizado para cada empresa. Entre em contato conosco para discutirmos suas necessidades específicas.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </AnimatedContainer>
  )
}
