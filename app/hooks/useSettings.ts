'use client'

import { useState, useCallback } from 'react'

interface Settings {
  theme: 'light' | 'dark' | 'system'
  language: 'pt' | 'en'
  notifications: boolean
  default_model: string
}

interface UseSettingsOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useSettings(options: UseSettingsOptions = {}) {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/settings')
      if (!response.ok) {
        throw new Error('Failed to fetch settings')
      }

      const data = await response.json()
      setSettings(data)
      options.onSuccess?.()
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      setError(error)
      options.onError?.(error)
    } finally {
      setLoading(false)
    }
  }, [options])

  const updateSettings = useCallback(async (data: Partial<Settings>) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update settings')
      }

      const updatedSettings = await response.json()
      setSettings(updatedSettings)
      options.onSuccess?.()
      return updatedSettings
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
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings,
  }
}
