-- Extensão para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de prompts
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  prompt_pt TEXT NOT NULL,
  prompt_en TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  model VARCHAR(100),
  specific_fields JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX prompts_user_id_idx ON prompts(user_id);
CREATE INDEX prompts_category_idx ON prompts(category);
CREATE INDEX prompts_tags_idx ON prompts USING GIN(tags);
CREATE INDEX prompts_created_at_idx ON prompts(created_at DESC);

-- Função para atualizar o updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar o updated_at
CREATE TRIGGER update_prompts_updated_at
  BEFORE UPDATE ON prompts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
