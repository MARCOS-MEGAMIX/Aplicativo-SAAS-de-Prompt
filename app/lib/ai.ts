import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'

// Inicialização das APIs
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Sistema base para engenharia de prompts
const PROMPT_ENGINEER_SYSTEM = `Você é um especialista em engenharia de prompts para IA gerativa, com vasto conhecimento em:
- Estruturação de prompts efetivos
- Técnicas de chain-of-thought
- Otimização de resultados
- Adaptação contextual
- Controle de estilo e tom
- Parâmetros técnicos de imagem

Seu objetivo é ajudar a criar, analisar e aprimorar prompts para garantir os melhores resultados possíveis.

Ao analisar ou criar prompts, considere:
1. Clareza e especificidade
2. Estrutura e formatação
3. Palavras-chave e modificadores
4. Aspectos técnicos (resolução, estilo, composição)
5. Contexto e objetivo
6. Possíveis melhorias

Forneça sempre explicações detalhadas sobre suas sugestões.`

// Função para melhorar prompts usando GPT-4
export async function improvePromptWithGPT4(prompt: string, context?: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: PROMPT_ENGINEER_SYSTEM },
      { role: 'user', content: `Analise e melhore o seguinte prompt para geração de imagem:
Prompt original: ${prompt}
${context ? `Contexto adicional: ${context}` : ''}

Forneça:
1. Prompt aprimorado
2. Explicação das melhorias
3. Sugestões de variações` }
    ],
    temperature: 0.7,
  })

  return response.choices[0].message.content
}

// Função para melhorar prompts usando Claude
export async function improvePromptWithClaude(prompt: string, context?: string) {
  const response = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 1000,
    system: PROMPT_ENGINEER_SYSTEM,
    messages: [{
      role: 'user',
      content: `Analise e melhore o seguinte prompt para geração de imagem:
Prompt original: ${prompt}
${context ? `Contexto adicional: ${context}` : ''}

Forneça:
1. Prompt aprimorado
2. Explicação das melhorias
3. Sugestões de variações`
    }]
  })

  return response.content[0].text
}

// Função para gerar variações de prompts
export async function generatePromptVariations(prompt: string, style: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: PROMPT_ENGINEER_SYSTEM },
      { role: 'user', content: `Crie 3 variações do seguinte prompt, adaptando para o estilo "${style}":
Prompt base: ${prompt}

Para cada variação, forneça:
1. Prompt adaptado
2. Explicação das modificações
3. Parâmetros técnicos recomendados` }
    ],
    temperature: 0.8,
  })

  return response.choices[0].message.content
}

// Função para analisar a qualidade do prompt
export async function analyzePromptQuality(prompt: string) {
  const response = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 1000,
    system: PROMPT_ENGINEER_SYSTEM,
    messages: [{
      role: 'user',
      content: `Analise a qualidade do seguinte prompt:
${prompt}

Forneça:
1. Pontuação geral (0-10)
2. Pontos fortes
3. Pontos fracos
4. Sugestões de melhoria
5. Análise técnica dos parâmetros`
    }]
  })

  return response.content[0].text
}

// Interface para resultados da análise
export interface PromptAnalysis {
  improvedPrompt: string
  explanation: string
  variations: string[]
  technicalParams: {
    resolution?: string
    style?: string
    composition?: string
    lighting?: string
    [key: string]: string | undefined
  }
  quality: {
    score: number
    strengths: string[]
    weaknesses: string[]
    suggestions: string[]
  }
}
