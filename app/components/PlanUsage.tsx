'use client'

import { FC } from 'react'
import { Sparkles, Image } from 'lucide-react'
import Link from 'next/link'

interface PlanUsageProps {
  plan?: {
    name: string
    promptLimit: number
    imageLimit: number
  }
  currentUsage?: {
    promptsUsed: number
    imagesUsed: number
  }
}

const PlanUsage: FC<PlanUsageProps> = ({ plan, currentUsage }) => {
  if (!plan || !currentUsage) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Carregando informações do plano...</p>
        </div>
      </div>
    )
  }

  const promptPercentage = Math.round((currentUsage.promptsUsed / plan.promptLimit) * 100)
  const imagePercentage = Math.round((currentUsage.imagesUsed / plan.imageLimit) * 100)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Uso do Plano</h3>
        <Link
          href="/precos"
          className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
        >
          Alterar Plano
        </Link>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="font-medium">Prompts</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentUsage.promptsUsed} / {plan.promptLimit}
            </span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                promptPercentage >= 90
                  ? 'bg-red-500'
                  : promptPercentage >= 75
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(promptPercentage, 100)}%` }}
            />
          </div>
          {promptPercentage >= 90 && (
            <p className="mt-2 text-sm text-red-500">
              Você está próximo do limite de prompts do seu plano
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Image className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="font-medium">Imagens</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentUsage.imagesUsed} / {plan.imageLimit}
            </span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                imagePercentage >= 90
                  ? 'bg-red-500'
                  : imagePercentage >= 75
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(imagePercentage, 100)}%` }}
            />
          </div>
          {imagePercentage >= 90 && (
            <p className="mt-2 text-sm text-red-500">
              Você está próximo do limite de imagens do seu plano
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold">{plan.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Seu plano atual
            </p>
          </div>
          <Link
            href="/precos"
            className="btn-secondary"
          >
            Upgrade
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PlanUsage
