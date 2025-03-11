'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ViewGridIcon, ViewListIcon, UploadIcon } from '@heroicons/react/outline'

interface ImagemGerada {
  id: string
  titulo: string
  promptId: string
  url: string
  createdAt: Date
  metadata: {
    width: number
    height: number
    modelo: string
    parametros: Record<string, any>
  }
}

export default function GaleriaPage() {
  const [imagens, setImagens] = useState<ImagemGerada[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedImage, setSelectedImage] = useState<ImagemGerada | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImage: ImagemGerada = {
          id: Math.random().toString(36).substr(2, 9),
          titulo: file.name.replace(/\.[^/.]+$/, ""),
          promptId: '',
          url: reader.result as string,
          createdAt: new Date(),
          metadata: {
            width: 0,
            height: 0,
            modelo: 'upload',
            parametros: {}
          }
        }
        setImagens([...imagens, newImage])
      }
      reader.readAsDataURL(file)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Galeria de Imagens</h1>
        <div className="flex gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
              }`}
            >
              <ViewGridIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
              }`}
            >
              <ViewListIcon className="h-5 w-5" />
            </button>
          </div>
          <label className="btn-primary cursor-pointer">
            <UploadIcon className="h-5 w-5 mr-2" />
            Enviar Imagem
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'space-y-4'}
      >
        {imagens.map((imagem) => (
          <motion.div
            key={imagem.id}
            variants={item}
            className={`card cursor-pointer ${viewMode === 'list' ? 'flex gap-4' : ''}`}
            onClick={() => setSelectedImage(imagem)}
          >
            <div className={viewMode === 'list' ? 'w-48 h-32' : 'w-full h-48'}>
              <img
                src={imagem.url}
                alt={imagem.titulo}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{imagem.titulo}</h3>
              <p className="text-sm text-gray-500">
                Criado em {imagem.createdAt.toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{selectedImage.titulo}</h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  &times;
                </button>
              </div>
              
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.titulo}
                  className="rounded-lg object-contain w-full h-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700">Informações</h4>
                  <dl className="mt-2 space-y-1">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Data de criação:</dt>
                      <dd className="text-sm text-gray-900">
                        {selectedImage.createdAt.toLocaleDateString()}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Modelo:</dt>
                      <dd className="text-sm text-gray-900">{selectedImage.metadata.modelo}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700">Parâmetros</h4>
                  <dl className="mt-2 space-y-1">
                    {Object.entries(selectedImage.metadata.parametros).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <dt className="text-sm text-gray-500">{key}:</dt>
                        <dd className="text-sm text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {imagens.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500">Nenhuma imagem encontrada.</p>
          <p className="text-gray-400 text-sm mt-2">
            Comece enviando uma imagem ou gerando uma nova!
          </p>
        </motion.div>
      )}
    </div>
  )
}
