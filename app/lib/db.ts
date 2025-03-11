import { prisma } from '@/lib/prisma'

export const db = {
  query: async (text: string, params?: any[]) => {
    console.log('Query:', text, params)
    try {
      // Para compatibilidade com o código existente, mantemos a interface de query
      // mas usamos o Prisma para executar consultas SQL brutas
      const result = await prisma.$queryRawUnsafe(text, ...(params || []))
      return { rows: Array.isArray(result) ? result : [result] }
    } catch (error) {
      console.error('Erro na query:', error)
      throw error
    }
  },
  end: async () => {
    await prisma.$disconnect()
  }
}

// Teste de conexão
prisma.$queryRawUnsafe('SELECT NOW()').then(res => {
  console.log('Conectado ao PostgreSQL com sucesso!')
}).catch(err => {
  console.error('Erro ao conectar ao PostgreSQL:', err)
})

// Função para executar queries
export async function query(text: string, params?: any[]) {
  const result = await prisma.$queryRawUnsafe(text, ...(params || []))
  return { rows: Array.isArray(result) ? result : [result] }
}

// Tipos para as tabelas
export interface Prompt {
  id: string
  titulo: string
  prompt_pt: string
  prompt_en: string
  categoria_id: string
  template_id?: string
  created_at: Date
  updated_at: Date
}

export interface Imagem {
  id: string
  prompt_id: string
  url: string
  storage_path: string
  metadata: Record<string, any>
  parametros: Record<string, any>
  width?: number
  height?: number
  formato?: string
  tamanho_bytes?: number
  created_at: Date
}

export interface Tag {
  id: string
  nome: string
  created_at: Date
  updated_at: Date
}

export interface Categoria {
  id: string
  nome: string
  descricao?: string
  created_at: Date
  updated_at: Date
}

export interface Template {
  id: string
  nome: string
  descricao?: string
  estrutura: string
  categoria_id?: string
  created_at: Date
  updated_at: Date
}

// Funções auxiliares para CRUD

// Prompts
export async function createPrompt(prompt: Omit<Prompt, 'id' | 'created_at' | 'updated_at'>) {
  const result = await prisma.$queryRawUnsafe(
    `INSERT INTO prompts (titulo, prompt_pt, prompt_en, categoria_id, template_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [prompt.titulo, prompt.prompt_pt, prompt.prompt_en, prompt.categoria_id, prompt.template_id]
  )
  return result
}

export async function getPromptById(id: string) {
  const result = await prisma.$queryRawUnsafe(
    `SELECT p.*, 
            array_agg(DISTINCT t.nome) as tags,
            json_agg(DISTINCT i.*) FILTER (WHERE i.id IS NOT NULL) as imagens
     FROM prompts p
     LEFT JOIN prompt_tags pt ON p.id = pt.prompt_id
     LEFT JOIN tags t ON pt.tag_id = t.id
     LEFT JOIN imagens i ON p.id = i.prompt_id
     WHERE p.id = $1
     GROUP BY p.id`,
    [id]
  )
  return result
}

export async function updatePrompt(id: string, prompt: Partial<Prompt>) {
  const fields = Object.keys(prompt)
  const values = Object.values(prompt)
  
  const setClause = fields.map((field, i) => `${field} = $${i + 1}`).join(', ')
  const result = await prisma.$queryRawUnsafe(
    `UPDATE prompts
    SET ${setClause}
    WHERE id = $${fields.length + 1}
    RETURNING *`,
    [...values, id]
  )
  return result
}

// Imagens
export async function createImagem(imagem: Omit<Imagem, 'id' | 'created_at'>) {
  const result = await prisma.$queryRawUnsafe(
    `INSERT INTO imagens (prompt_id, url, storage_path, metadata, parametros, width, height, formato, tamanho_bytes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      imagem.prompt_id,
      imagem.url,
      imagem.storage_path,
      imagem.metadata,
      imagem.parametros,
      imagem.width,
      imagem.height,
      imagem.formato,
      imagem.tamanho_bytes
    ]
  )
  return result
}

// Tags
export async function createTag(nome: string) {
  const result = await prisma.$queryRawUnsafe(
    `INSERT INTO tags (nome) VALUES ($1) RETURNING *`,
    [nome]
  )
  return result
}

export async function addTagToPrompt(promptId: string, tagId: string) {
  await prisma.$queryRawUnsafe(
    `INSERT INTO prompt_tags (prompt_id, tag_id) VALUES ($1, $2)`,
    [promptId, tagId]
  )
}

// Busca de prompts com filtros
export async function searchPrompts(params: {
  search?: string
  categoria_id?: string
  tags?: string[]
  page?: number
  limit?: number
}) {
  const conditions = []
  const values = []
  let valueIndex = 1

  if (params.search) {
    conditions.push(`(
      p.titulo ILIKE $${valueIndex}
      OR p.prompt_pt ILIKE $${valueIndex}
      OR p.prompt_en ILIKE $${valueIndex}
    )`)
    values.push(`%${params.search}%`)
    valueIndex++
  }

  if (params.categoria_id) {
    conditions.push(`p.categoria_id = $${valueIndex}`)
    values.push(params.categoria_id)
    valueIndex++
  }

  if (params.tags && params.tags.length > 0) {
    const tagPlaceholders = params.tags.map((_, i) => `$${valueIndex + i}`).join(', ')
    conditions.push(`t.nome = ANY(ARRAY[${tagPlaceholders}])`)
    values.push(...params.tags)
    valueIndex += params.tags.length
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
  
  const limit = params.limit || 10
  const offset = ((params.page || 1) - 1) * limit

  const queryText = `
    SELECT DISTINCT p.*,
           array_agg(DISTINCT t.nome) as tags,
           json_agg(DISTINCT i.*) FILTER (WHERE i.id IS NOT NULL) as imagens
    FROM prompts p
    LEFT JOIN prompt_tags pt ON p.id = pt.prompt_id
    LEFT JOIN tags t ON pt.tag_id = t.id
    LEFT JOIN imagens i ON p.id = i.prompt_id
    ${whereClause}
    GROUP BY p.id
    ORDER BY p.created_at DESC
    LIMIT $${valueIndex} OFFSET $${valueIndex + 1}
  `

  values.push(limit, offset)
  const result = await prisma.$queryRawUnsafe(queryText, ...values)
  return result
}
