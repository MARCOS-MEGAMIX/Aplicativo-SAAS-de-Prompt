'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PlusIcon, DuplicateIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline'

interface Template {
  id: string
  nome: string
  descricao: string
  estrutura: string
  categoria: string
  createdAt: Date
  updatedAt: Date
}

interface TemplateFormData {
  nome: string
  descricao: string
  estrutura: string
  categoria: string
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const [formData, setFormData] = useState<TemplateFormData>({
    nome: '',
    descricao: '',
    estrutura: '',
    categoria: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTemplate) {
      // Atualizar template existente
      const updatedTemplates = templates.map(template =>
        template.id === editingTemplate.id
          ? {
              ...template,
              ...formData,
              updatedAt: new Date()
            }
          : template
      )
      setTemplates(updatedTemplates)
    } else {
      // Criar novo template
      const newTemplate: Template = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setTemplates([...templates, newTemplate])
    }
    handleCloseForm()
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingTemplate(null)
    setFormData({
      nome: '',
      descricao: '',
      estrutura: '',
      categoria: ''
    })
  }

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template)
    setFormData({
      nome: template.nome,
      descricao: template.descricao,
      estrutura: template.estrutura,
      categoria: template.categoria
    })
    setShowForm(true)
  }

  const handleDuplicateTemplate = (template: Template) => {
    const newTemplate: Template = {
      ...template,
      id: Math.random().toString(36).substr(2, 9),
      nome: `${template.nome} (Cópia)`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setTemplates([...templates, newTemplate])
  }

  const handleDeleteTemplate = (templateId: string) => {
    if (confirm('Tem certeza que deseja excluir este template?')) {
      setTemplates(templates.filter(template => template.id !== templateId))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Novo Template
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8"
        >
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                  Nome do Template
                </label>
                <input
                  type="text"
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="mt-1 input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                  Categoria
                </label>
                <select
                  id="categoria"
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="mt-1 input-field"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="anuncios">Anúncios de Supermercado</option>
                  <option value="embalagens">Embalagens de Produtos</option>
                  <option value="marketing">Marketing Digital</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  rows={2}
                  className="mt-1 input-field"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="estrutura" className="block text-sm font-medium text-gray-700">
                  Estrutura do Template
                </label>
                <textarea
                  id="estrutura"
                  value={formData.estrutura}
                  onChange={(e) => setFormData({ ...formData, estrutura: e.target.value })}
                  rows={6}
                  className="mt-1 input-field font-mono"
                  placeholder="Ex: Uma imagem de {objeto} com {estilo} no estilo {artista}"
                  required
                />
                <p className="mt-2 text-sm text-gray-500">
                  Use chaves {} para marcar campos variáveis no template.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={handleCloseForm}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                {editingTemplate ? 'Salvar Alterações' : 'Criar Template'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{template.nome}</h3>
                <span className="tag bg-purple-100 text-purple-600">
                  {template.categoria}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{template.descricao}</p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {template.estrutura}
                </pre>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleDuplicateTemplate(template)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                  title="Duplicar"
                >
                  <DuplicateIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleEditTemplate(template)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                  title="Editar"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="p-2 text-red-600 hover:text-red-900"
                  title="Excluir"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {templates.length === 0 && !showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500">Nenhum template encontrado.</p>
          <p className="text-gray-400 text-sm mt-2">
            Comece criando um novo template!
          </p>
        </motion.div>
      )}
    </div>
  )
}
