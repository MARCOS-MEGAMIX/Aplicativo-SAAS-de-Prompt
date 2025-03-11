'use client'

import { useState } from 'react'
import { Prompt, Categoria } from '@/types'
import { translateText } from '@/lib/translate'
import { Loader2, ArrowRightLeft, AlertCircle } from 'lucide-react'
import AnimatedContainer from './AnimatedContainer'

interface PromptFormProps {
  initialData?: Partial<Prompt>
  categorias: Categoria[]
  onSubmit: (data: Partial<Prompt>) => void
  isLoading?: boolean
}

export default function PromptForm({ initialData, categorias, onSubmit, isLoading }: PromptFormProps) {
  const [formData, setFormData] = useState<Partial<Prompt>>(initialData || {
    titulo: '',
    prompt_pt: '',
    prompt_en: '',
    categoria_id: ''
  })

  const [isTranslating, setIsTranslating] = useState(false)
  const [translationError, setTranslationError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleTranslate = async (direction: 'toEnglish' | 'toPortuguese') => {
    try {
      setIsTranslating(true)
      setTranslationError(null)

      const textToTranslate = direction === 'toEnglish' ? formData.prompt_pt : formData.prompt_en
      const targetLang = direction === 'toEnglish' ? 'en' : 'pt'

      if (!textToTranslate) {
        throw new Error('Por favor, insira o texto para traduzir')
      }

      const translatedText = await translateText(textToTranslate, targetLang)
      
      setFormData(prev => ({
        ...prev,
        [direction === 'toEnglish' ? 'prompt_en' : 'prompt_pt']: translatedText
      }))
    } catch (error) {
      setTranslationError(error instanceof Error ? error.message : 'Erro ao traduzir')
    } finally {
      setIsTranslating(false)
    }
  }

  return (
    <AnimatedContainer>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Título
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="categoria_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Categoria
          </label>
          <select
            id="categoria_id"
            name="categoria_id"
            value={formData.categoria_id}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <label htmlFor="prompt_pt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prompt em Português
            </label>
            <textarea
              id="prompt_pt"
              name="prompt_pt"
              value={formData.prompt_pt}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
              required
            />
            {formData.prompt_pt && (
              <button
                type="button"
                onClick={() => handleTranslate('toEnglish')}
                className="absolute right-2 top-8 p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                disabled={isTranslating}
              >
                {isTranslating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRightLeft className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          <div className="relative">
            <label htmlFor="prompt_en" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prompt em Inglês
            </label>
            <textarea
              id="prompt_en"
              name="prompt_en"
              value={formData.prompt_en}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
              required
            />
            {formData.prompt_en && (
              <button
                type="button"
                onClick={() => handleTranslate('toPortuguese')}
                className="absolute right-2 top-8 p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                disabled={isTranslating}
              >
                {isTranslating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRightLeft className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          {translationError && (
            <div className="flex items-center space-x-2 text-red-500 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{translationError}</span>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white rounded-lg font-medium transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Salvando...</span>
              </span>
            ) : (
              'Salvar Prompt'
            )}
          </button>
        </div>
      </form>
    </AnimatedContainer>
  )
}
