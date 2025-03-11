'use client'

import { useState } from 'react'
import AnimatedContainer from '../components/AnimatedContainer'
import PlanUsage from '../components/PlanUsage'
import { useSubscription } from '../hooks/useSubscription'
import { User, Settings, CreditCard, Bell, Moon, Sun, Globe } from 'lucide-react'
import Link from 'next/link'

interface UserProfile {
  id: string
  name: string
  email: string
  image?: string
  settings: {
    theme: 'light' | 'dark'
    language: 'pt' | 'en'
    notifications: boolean
    defaultModel: 'gpt4' | 'claude'
  }
}

export default function PerfilPage() {
  const { currentPlan, currentUsage, isLoading } = useSubscription()
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: 'Usuário Exemplo',
    email: 'usuario@exemplo.com',
    settings: {
      theme: 'light',
      language: 'pt',
      notifications: true,
      defaultModel: 'gpt4'
    }
  })

  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'billing'>('profile')

  const handleUpdateProfile = async (data: Partial<UserProfile>) => {
    // TODO: Implementar atualização do perfil
    setProfile(prev => ({ ...prev, ...data }))
  }

  const handleUpdateSettings = async (settings: Partial<UserProfile['settings']>) => {
    // TODO: Implementar atualização das configurações
    setProfile(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings }
    }))
  }

  return (
    <AnimatedContainer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  {profile.image ? (
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-24 h-24 rounded-full"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <User className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                    </div>
                  )}
                  <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {profile.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">{profile.email}</p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <User className="w-5 h-5" />
                  Perfil
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Configurações
                </button>
                <button
                  onClick={() => setActiveTab('billing')}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'billing'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  Assinatura
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Informações do Perfil</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleUpdateProfile({ name: e.target.value })}
                      className="input-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleUpdateProfile({ email: e.target.value })}
                      className="input-base"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Salvar Alterações
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Configurações</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {profile.settings.theme === 'light' ? (
                        <Sun className="w-5 h-5" />
                      ) : (
                        <Moon className="w-5 h-5" />
                      )}
                      <div>
                        <p className="font-medium">Tema</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {profile.settings.theme === 'light' ? 'Claro' : 'Escuro'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUpdateSettings({
                        theme: profile.settings.theme === 'light' ? 'dark' : 'light'
                      })}
                      className="btn-secondary"
                    >
                      Alterar
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Idioma</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {profile.settings.language === 'pt' ? 'Português' : 'English'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUpdateSettings({
                        language: profile.settings.language === 'pt' ? 'en' : 'pt'
                      })}
                      className="btn-secondary"
                    >
                      Alterar
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Notificações</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {profile.settings.notifications ? 'Ativadas' : 'Desativadas'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUpdateSettings({
                        notifications: !profile.settings.notifications
                      })}
                      className="btn-secondary"
                    >
                      {profile.settings.notifications ? 'Desativar' : 'Ativar'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <PlanUsage plan={currentPlan} currentUsage={currentUsage} />
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-6">Histórico de Pagamentos</h3>
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum pagamento registrado</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4">Método de Pagamento</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Adicione ou atualize seu método de pagamento
                  </p>
                  <Link
                    href="/precos"
                    className="btn-primary inline-flex"
                  >
                    Gerenciar Pagamento
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedContainer>
  )
}
