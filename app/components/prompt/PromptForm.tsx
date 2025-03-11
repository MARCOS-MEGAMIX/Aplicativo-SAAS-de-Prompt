'use client'

import { useState } from 'react'
import { PromptCategory, type Prompt } from '@/types'

interface PromptFormProps {
  initialData?: Prompt
  onSubmit: (data: Partial<Prompt>) => void
}

export function PromptForm({ initialData, onSubmit }: PromptFormProps) {
  const [category, setCategory] = useState<PromptCategory>(
    initialData?.category || 'chat'
  )

  // Campos comuns para todos os tipos
  const BaseFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Título</label>
        <input
          type="text"
          className="w-full rounded-lg border p-2"
          name="title"
          defaultValue={initialData?.title}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Prompt (PT)</label>
        <textarea
          className="w-full rounded-lg border p-2 h-32"
          name="promptPt"
          defaultValue={initialData?.promptPt}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Prompt (EN)</label>
        <textarea
          className="w-full rounded-lg border p-2 h-32"
          name="promptEn"
          defaultValue={initialData?.promptEn}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tags</label>
        <input
          type="text"
          className="w-full rounded-lg border p-2"
          name="tags"
          placeholder="Separe as tags por vírgula"
          defaultValue={initialData?.tags?.join(', ')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Modelo</label>
        <input
          type="text"
          className="w-full rounded-lg border p-2"
          name="model"
          defaultValue={initialData?.model}
        />
      </div>
    </div>
  )

  // Campos específicos para chat
  const ChatFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Contexto</label>
        <textarea
          className="w-full rounded-lg border p-2 h-24"
          name="context"
          defaultValue={(initialData as any)?.context}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mensagem do Sistema</label>
        <textarea
          className="w-full rounded-lg border p-2 h-24"
          name="systemMessage"
          defaultValue={(initialData as any)?.systemMessage}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Temperatura</label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="2"
          className="w-full rounded-lg border p-2"
          name="temperature"
          defaultValue={(initialData as any)?.temperature || 0.7}
        />
      </div>
    </div>
  )

  // Campos específicos para imagem
  const ImageFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Prompt Negativo</label>
        <textarea
          className="w-full rounded-lg border p-2 h-24"
          name="negativePrompt"
          defaultValue={(initialData as any)?.negativePrompt}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Largura</label>
          <input
            type="number"
            step="8"
            className="w-full rounded-lg border p-2"
            name="width"
            defaultValue={(initialData as any)?.width || 512}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Altura</label>
          <input
            type="number"
            step="8"
            className="w-full rounded-lg border p-2"
            name="height"
            defaultValue={(initialData as any)?.height || 512}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Estilo</label>
        <input
          type="text"
          className="w-full rounded-lg border p-2"
          name="style"
          defaultValue={(initialData as any)?.style}
        />
      </div>
    </div>
  )

  // Campos específicos para código
  const CodeFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Linguagem</label>
        <input
          type="text"
          className="w-full rounded-lg border p-2"
          name="language"
          defaultValue={(initialData as any)?.language}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Framework</label>
        <input
          type="text"
          className="w-full rounded-lg border p-2"
          name="framework"
          defaultValue={(initialData as any)?.framework}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Documentação</label>
        <textarea
          className="w-full rounded-lg border p-2 h-24"
          name="documentation"
          defaultValue={(initialData as any)?.documentation}
        />
      </div>
    </div>
  )

  // Campos específicos para texto
  const TextFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Tom</label>
        <input
          type="text"
          className="w-full rounded-lg border p-2"
          name="tone"
          defaultValue={(initialData as any)?.tone}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Público-alvo</label>
        <input
          type="text"
          className="w-full rounded-lg border p-2"
          name="audience"
          defaultValue={(initialData as any)?.audience}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Formato</label>
        <input
          type="text"
          className="w-full rounded-lg border p-2"
          name="format"
          defaultValue={(initialData as any)?.format}
        />
      </div>
    </div>
  )

  // Campos específicos para áudio
  const AudioFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Duração (segundos)</label>
        <input
          type="number"
          className="w-full rounded-lg border p-2"
          name="duration"
          defaultValue={(initialData as any)?.duration}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Estilo</label>
        <input
          type="text"
          className="w-full rounded-lg border p-2"
          name="style"
          defaultValue={(initialData as any)?.style}
        />
      </div>
    </div>
  )

  // Campos específicos para vídeo
  const VideoFields = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Duração (segundos)</label>
        <input
          type="number"
          className="w-full rounded-lg border p-2"
          name="duration"
          defaultValue={(initialData as any)?.duration}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Estilo</label>
        <input
          type="text"
          className="w-full rounded-lg border p-2"
          name="style"
          defaultValue={(initialData as any)?.style}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Storyboard</label>
        <textarea
          className="w-full rounded-lg border p-2 h-24"
          name="storyboard"
          defaultValue={(initialData as any)?.storyboard}
        />
      </div>
    </div>
  )

  return (
    <form className="space-y-8" onSubmit={(e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const data: any = {}
      formData.forEach((value, key) => {
        if (key === 'tags') {
          data[key] = value.toString().split(',').map(tag => tag.trim())
        } else {
          data[key] = value
        }
      })
      data.category = category
      onSubmit(data)
    }}>
      <div>
        <label className="block text-sm font-medium mb-1">Categoria</label>
        <select
          className="w-full rounded-lg border p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value as PromptCategory)}
        >
          <option value="chat">Chat/Conversação</option>
          <option value="image">Geração de Imagens</option>
          <option value="code">Código/Programação</option>
          <option value="text">Texto/Redação</option>
          <option value="audio">Áudio/Música</option>
          <option value="video">Vídeo/Animação</option>
        </select>
      </div>

      <BaseFields />

      {category === 'chat' && <ChatFields />}
      {category === 'image' && <ImageFields />}
      {category === 'code' && <CodeFields />}
      {category === 'text' && <TextFields />}
      {category === 'audio' && <AudioFields />}
      {category === 'video' && <VideoFields />}

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Salvar Prompt
        </button>
      </div>
    </form>
  )
}
