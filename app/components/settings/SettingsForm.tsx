'use client'

import { useEffect } from 'react'
import { useSettings } from '@/app/hooks/useSettings'

export function SettingsForm() {
  const {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings,
  } = useSettings({
    onSuccess: () => {
      // Atualizar tema
      if (settings?.theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
  })

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Carregando configurações...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg">
        Erro ao carregar configurações: {error.message}
      </div>
    )
  }

  if (!settings) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    await updateSettings({
      theme: formData.get('theme') as 'light' | 'dark' | 'system',
      language: formData.get('language') as 'pt' | 'en',
      notifications: formData.get('notifications') === 'on',
      default_model: formData.get('default_model') as string,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Aparência</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Tema
            </label>
            <select
              name="theme"
              defaultValue={settings.theme}
              className="w-full rounded-lg border p-2 bg-white dark:bg-gray-900"
            >
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
              <option value="system">Sistema</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Idioma
            </label>
            <select
              name="language"
              defaultValue={settings.language}
              className="w-full rounded-lg border p-2 bg-white dark:bg-gray-900"
            >
              <option value="pt">Português</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Notificações</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="notifications"
              defaultChecked={settings.notifications}
              className="rounded border-gray-300"
            />
            <label className="ml-2">
              Receber notificações
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Modelo Padrão</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Modelo de IA
            </label>
            <select
              name="default_model"
              defaultValue={settings.default_model}
              className="w-full rounded-lg border p-2 bg-white dark:bg-gray-900"
            >
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-4">GPT-4</option>
              <option value="claude-2">Claude 2</option>
              <option value="claude-3">Claude 3</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Salvar Alterações
        </button>
      </div>
    </form>
  )
}
