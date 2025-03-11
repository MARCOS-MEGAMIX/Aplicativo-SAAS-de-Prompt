'use client'

import { useState, useEffect } from 'react'
import { usePrompts } from '@/app/hooks/usePrompts'
import { Prompt, PromptCategory } from '@/types'
import { PromptForm } from './PromptForm'

interface PromptListProps {
  initialCategory?: PromptCategory
}

export function PromptList({ initialCategory }: PromptListProps) {
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | undefined>(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const {
    prompts,
    loading,
    error,
    fetchPrompts,
    createPrompt,
    updatePrompt,
    deletePrompt,
  } = usePrompts({
    onSuccess: () => {
      setIsFormOpen(false)
      setEditingPrompt(null)
    },
  })

  useEffect(() => {
    fetchPrompts(selectedCategory, searchQuery)
  }, [fetchPrompts, selectedCategory, searchQuery])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value as PromptCategory || undefined)
  }

  const handleEdit = (prompt: Prompt) => {
    setEditingPrompt(prompt)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este prompt?')) {
      await deletePrompt(id)
    }
  }

  const handleSubmit = async (data: Partial<Prompt>) => {
    if (editingPrompt) {
      await updatePrompt(editingPrompt.id, data)
    } else {
      await createPrompt(data)
    }
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        Erro ao carregar prompts: {error.message}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Meus Prompts</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Novo Prompt
        </button>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Buscar prompts..."
          value={searchQuery}
          onChange={handleSearch}
          className="flex-1 rounded-lg border p-2"
        />

        <select
          value={selectedCategory || ''}
          onChange={handleCategoryChange}
          className="rounded-lg border p-2"
        >
          <option value="">Todas as categorias</option>
          <option value="chat">Chat/Conversação</option>
          <option value="image">Geração de Imagens</option>
          <option value="code">Código/Programação</option>
          <option value="text">Texto/Redação</option>
          <option value="audio">Áudio/Música</option>
          <option value="video">Vídeo/Animação</option>
        </select>
      </div>

      {loading ? (
        <div className="p-4 text-center">Carregando...</div>
      ) : prompts.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          Nenhum prompt encontrado
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prompts.map((prompt) => (
            <div
              key={prompt.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{prompt.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(prompt)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(prompt.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Excluir
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-2">
                {prompt.promptPt}
              </div>

              <div className="flex flex-wrap gap-2">
                {prompt.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {editingPrompt ? 'Editar Prompt' : 'Novo Prompt'}
              </h3>
              <button
                onClick={() => {
                  setIsFormOpen(false)
                  setEditingPrompt(null)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Fechar
              </button>
            </div>

            <PromptForm
              initialData={editingPrompt || undefined}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  )
}
