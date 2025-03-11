'use client'

import { useState } from 'react'
import { ViewGridIcon, ViewListIcon } from '@heroicons/react/outline'
import { Prompt } from '@/types'
import Link from 'next/link'
import { Edit, Trash2, Image as ImageIcon, Tag } from 'lucide-react'
import AnimatedContainer from './AnimatedContainer'

interface PromptGridProps {
  prompts: Prompt[]
  onDelete?: (id: string) => void
  onEdit?: (prompt: Prompt) => void
}

export default function PromptGrid({ prompts, onDelete, onEdit }: PromptGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Biblioteca de Prompts</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${
              viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
          >
            <ViewGridIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
          >
            <ViewListIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {prompts.map((prompt) => (
          <AnimatedContainer
            key={prompt.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2">
                  {prompt.titulo}
                </h3>
                <div className="flex space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(prompt)}
                      className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(prompt.id)}
                      className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <h4 className="font-medium mb-1">Português:</h4>
                  <p className="line-clamp-3">{prompt.prompt_pt}</p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <h4 className="font-medium mb-1">English:</h4>
                  <p className="line-clamp-3">{prompt.prompt_en}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <ImageIcon className="w-4 h-4" />
                    <span>{prompt.imagens?.length || 0} imagens</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Tag className="w-4 h-4" />
                    <span>{prompt.tags?.length || 0} tags</span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href={`/prompt/${prompt.id}`}
              className="block p-4 bg-gray-50 dark:bg-gray-700/50 text-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Ver detalhes
            </Link>
          </AnimatedContainer>
        ))}
      </div>

      {selectedPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <AnimatedContainer className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-900">{selectedPrompt.titulo}</h3>
                <button
                  onClick={() => setSelectedPrompt(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  &times;
                </button>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700">Português</h4>
                  <p className="mt-1 text-gray-600">{selectedPrompt.prompt_pt}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">English</h4>
                  <p className="mt-1 text-gray-600">{selectedPrompt.prompt_en}</p>
                </div>
              </div>

              {selectedPrompt.imagens && selectedPrompt.imagens.length > 0 && (
                <div className="mt-4">
                  <img
                    src={selectedPrompt.imagens[0].url}
                    alt={selectedPrompt.titulo}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              )}

              <div className="mt-4">
                <h4 className="font-medium text-gray-700">Tags</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedPrompt.tags?.map((tag) => (
                    <span key={tag} className="tag bg-blue-100 text-blue-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedContainer>
        </div>
      )}
    </div>
  )
}
