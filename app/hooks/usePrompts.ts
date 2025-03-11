import { useState, useCallback } from 'react'
import { Prompt, PromptCategory } from '@/types'

interface UsePromptsOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function usePrompts(options: UsePromptsOptions = {}) {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchPrompts = useCallback(async (category?: PromptCategory, query?: string) => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (category) params.append('category', category)
      if (query) params.append('query', query)

      const response = await fetch(`/api/prompts?${params.toString()}`)
      if (!response.ok) {
        throw new Error('Failed to fetch prompts')
      }

      const data = await response.json()
      setPrompts(data)
      options.onSuccess?.()
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      setError(error)
      options.onError?.(error)
    } finally {
      setLoading(false)
    }
  }, [options])

  const createPrompt = useCallback(async (data: Partial<Prompt>) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create prompt')
      }

      const newPrompt = await response.json()
      setPrompts(prev => [...prev, newPrompt])
      options.onSuccess?.()
      return newPrompt
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      setError(error)
      options.onError?.(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [options])

  const updatePrompt = useCallback(async (id: string, data: Partial<Prompt>) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/prompts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data }),
      })

      if (!response.ok) {
        throw new Error('Failed to update prompt')
      }

      const updatedPrompt = await response.json()
      setPrompts(prev => prev.map(p => p.id === id ? updatedPrompt : p))
      options.onSuccess?.()
      return updatedPrompt
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      setError(error)
      options.onError?.(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [options])

  const deletePrompt = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/prompts?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete prompt')
      }

      setPrompts(prev => prev.filter(p => p.id !== id))
      options.onSuccess?.()
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      setError(error)
      options.onError?.(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [options])

  return {
    prompts,
    loading,
    error,
    fetchPrompts,
    createPrompt,
    updatePrompt,
    deletePrompt,
  }
}
