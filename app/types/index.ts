export interface Prompt {
  id: string
  titulo: string
  prompt_pt: string
  prompt_en: string
  categoria_id: string
  template_id?: string
  created_at: Date
  updated_at: Date
  imagens?: Imagem[]
  tags?: string[]
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
