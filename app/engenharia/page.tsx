'use client'

import { useState } from 'react'
import PromptEngineer from '../components/PromptEngineer'
import AnimatedContainer from '../components/AnimatedContainer'
import { Sparkles } from 'lucide-react'

export default function EngenhariaPage() {
  const handleSavePrompt = (prompt: string) => {
    // TODO: Implementar salvamento do prompt
    console.log('Salvando prompt:', prompt)
  }

  return (
    <AnimatedContainer>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-3xl font-bold">
            <Sparkles className="w-8 h-8 text-purple-500" />
            Engenharia de Prompts
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Use a inteligência artificial para analisar, melhorar e gerar variações dos seus prompts.
            Nossa IA especialista em engenharia de prompts vai ajudar você a obter os melhores resultados.
          </p>
        </div>

        <div className="card p-6">
          <PromptEngineer onSave={handleSavePrompt} />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Dicas para Prompts Efetivos</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>• Seja específico e detalhado nas descrições</li>
              <li>• Use palavras-chave que direcionem o estilo</li>
              <li>• Inclua informações sobre composição e iluminação</li>
              <li>• Especifique o meio artístico desejado</li>
              <li>• Considere adicionar referências artísticas</li>
            </ul>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Recursos Avançados</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>• Análise de qualidade do prompt</li>
              <li>• Sugestões de melhorias automáticas</li>
              <li>• Geração de variações por estilo</li>
              <li>• Otimização de parâmetros técnicos</li>
              <li>• Integração com GPT-4 e Claude</li>
            </ul>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  )
}
