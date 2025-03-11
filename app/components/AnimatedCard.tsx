'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/outline'

interface AnimatedCardProps {
  title: string
  description: string
  href: string
  color: string
  icon: any
  variants?: any
}

export default function AnimatedCard({ title, description, href, color, icon: Icon, variants }: AnimatedCardProps) {
  return (
    <motion.div
      variants={variants}
      className="group"
    >
      <Link
        href={href}
        className={`card block p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-${color}-500`}
      >
        <div className={`inline-flex items-center justify-center p-2 mb-4 rounded-lg bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h2>
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        <div className={`inline-flex items-center text-${color}-600 group-hover:text-${color}-700 text-sm font-medium`}>
          Acessar
          <ArrowRightIcon className="ml-1.5 h-4 w-4" />
        </div>
      </Link>
    </motion.div>
  )
}
