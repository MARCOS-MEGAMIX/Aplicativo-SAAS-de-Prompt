'use client'

import { useState } from 'react'
import { 
  improvePromptWithGPT4, 
  improvePromptWithClaude, 
  generatePromptVariations, 
  analyzePromptQuality,
  PromptAnalysis 
} from '../lib/ai'
import { useSubscription } from '../hooks/useSubscription'
import { Wand2, Sparkles, RotateCcw, Save, AlertCircle, Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface PromptEngineerProps {
  onSave?: (prompt: string) => void
}

export default function PromptEngineer({ onSave }: PromptEngineerProps) {
  const { 
    currentPlan, 
    checkFeatureAvailability, 
    checkUsageAvailability,
    incrementUsage,
    isLoading: isLoadingSubscription 
  } = useSubscription()

  const [prompt, setPrompt] = useState('')
  const [context, setContext] = useState('')
  const [style, setStyle] = useState('realista')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [analysis, setAnalysis] = useState<PromptAnalysis | null>(null)
  const [selectedAI, setSelectedAI] = useState<'gpt4' | 'claude'>('gpt4')

  const handleImprovePrompt = async () => {
    try {
      if (!checkFeatureAvailability('aiAnalysis')) {
        setError('Análise de IA avançada disponível apenas em planos pagos')
        return
      }

      if (!checkUsageAvailability('prompts')) {
        setError('Você atingiu o limite de prompts do seu plano atual')
        return
      }

      setIsLoading(true)
      setError('')
      
      const improvedPrompt = await (selectedAI === 'gpt4' 
        ? improvePromptWithGPT4(prompt, context)
        : improvePromptWithClaude(prompt, context))
      
      const quality = await analyzePromptQuality(prompt)
      const variations = await generatePromptVariations(prompt, style)

      await incrementUsage('prompts')

      // TODO: Parse responses into PromptAnalysis format
      setAnalysis({
        improvedPrompt,
        explanation: 'Análise detalhada das melhorias...',
        variations: [],
        technicalParams: {},
        quality: {
          score: 0,
          strengths: [],
          weaknesses: [],
          suggestions: []
        }
      })
    } catch (err) {
      setError('Erro ao analisar o prompt. Por favor, tente novamente.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingSubscription) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!checkFeatureAvailability('aiAnalysis')) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
          <Lock className="w-8 h-8 text-gray-500 dark:text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-4">Recurso Premium</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          A análise avançada de prompts está disponível apenas para assinantes.
          Faça upgrade do seu plano para acessar este e outros recursos premium.
        </p>
        <Link
          href="/precos"
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors"
        >
          Ver Planos
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          className={`btn-secondary flex items-center gap-2 ${selectedAI === 'gpt4' ? 'ring-2 ring-purple-500' : ''}`}
          onClick={() => setSelectedAI('gpt4')}
        >
          <Sparkles className="w-5 h-5" />
          GPT-4
        </button>
        <button
          className={`btn-secondary flex items-center gap-2 ${selectedAI === 'claude' ? 'ring-2 ring-purple-500' : ''}`}
          onClick={() => setSelectedAI('claude')}
        >
          <Wand2 className="w-5 h-5" />
          Claude
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Prompt Original</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="input-base h-32"
            placeholder="Digite seu prompt aqui..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Contexto Adicional (opcional)</label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="input-base h-24"
            placeholder="Forneça contexto adicional para ajudar na análise..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Estilo</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="input-base"
          >
            <option value="realista">Realista</option>
            <option value="artistico">Artístico</option>
            <option value="3d">3D</option>
            <option value="minimalista">Minimalista</option>
            <option value="fotografia">Fotografia</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleImprovePrompt}
          disabled={!prompt || isLoading}
          className="btn-primary flex items-center gap-2"
        >
          {isLoading ? (
            <RotateCcw className="w-5 h-5 animate-spin" />
          ) : (
            <Wand2 className="w-5 h-5" />
          )}
          Analisar e Melhorar
        </button>

        {analysis && (
          <button
            onClick={() => onSave?.(analysis.improvedPrompt)}
            className="btn-secondary flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Salvar Prompt Melhorado
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {analysis && (
        <div className="space-y-6 mt-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Prompt Aprimorado</h3>
            <div className="card p-4">
              <pre className="whitespace-pre-wrap">{analysis.improvedPrompt}</pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Análise</h3>
            <div className="card p-4">
              <div className="prose dark:prose-invert">
                <h4>Explicação das Melhorias</h4>
                <p>{analysis.explanation}</p>

                <h4>Pontos Fortes</h4>
                <ul>
                  {analysis.quality.strengths.map((strength, i) => (
                    <li key={i}>{strength}</li>
                  ))}
                </ul>

                <h4>Sugestões de Melhoria</h4>
                <ul>
                  {analysis.quality.suggestions.map((suggestion, i) => (
                    <li key={i}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Variações</h3>
            <div className="grid gap-4">
              {analysis.variations.map((variation, i) => (
                <div key={i} className="card p-4">
                  <pre className="whitespace-pre-wrap">{variation}</pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
