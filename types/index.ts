export interface User {
  id: string
  name: string | null
  email: string | null
  image?: string | null
  planId: string
  stripeCustomerId?: string | null
  subscriptionId?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface UserSettings {
  id: string
  userId: string
  theme: 'light' | 'dark'
  language: 'pt' | 'en'
  notifications: boolean
  defaultModel: string
  createdAt: Date
  updatedAt: Date
}

export interface UsageLimit {
  id: string
  userId: string
  promptLimit: number
  promptsUsed: number
  resetDate: Date
  createdAt: Date
  updatedAt: Date
}

export type PromptCategory = 'chat' | 'image' | 'code' | 'text' | 'audio' | 'video'

// Campos base para todos os prompts
interface BasePrompt {
  id: string
  userId: string
  title: string
  promptPt: string
  promptEn: string
  category: PromptCategory
  tags: string[]
  model?: string
  version?: string
  isTemplate?: boolean
  createdAt: Date
  updatedAt: Date
}

// Prompt para chat/conversação
export interface ChatPrompt extends BasePrompt {
  category: 'chat'
  context?: string
  systemMessage?: string
  temperature?: number
}

// Prompt para geração de imagens
export interface ImagePrompt extends BasePrompt {
  category: 'image'
  negativePrompt?: string
  width?: number
  height?: number
  style?: string
  imageUrl?: string
}

// Prompt para código
export interface CodePrompt extends BasePrompt {
  category: 'code'
  language?: string
  framework?: string
  documentation?: string
}

// Prompt para texto/redação
export interface TextPrompt extends BasePrompt {
  category: 'text'
  tone?: string
  audience?: string
  format?: string
}

// Prompt para áudio
export interface AudioPrompt extends BasePrompt {
  category: 'audio'
  duration?: number
  style?: string
}

// Prompt para vídeo
export interface VideoPrompt extends BasePrompt {
  category: 'video'
  duration?: number
  style?: string
  storyboard?: string
}

// União de todos os tipos de prompts
export type Prompt = 
  | ChatPrompt 
  | ImagePrompt 
  | CodePrompt 
  | TextPrompt 
  | AudioPrompt 
  | VideoPrompt

export type Plan = {
  name: string
  promptLimit: number
  features: string[]
  price: {
    monthly: number
    yearly: number
  }
}

export type PlanType = 'free' | 'pro' | 'enterprise'

export interface Session {
  user: {
    id: string
    name: string | null
    email: string | null
    image?: string | null
  }
}
