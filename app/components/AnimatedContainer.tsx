'use client'

import { FC, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface AnimatedContainerProps {
  children: ReactNode
  className?: string
}

const AnimatedContainer: FC<AnimatedContainerProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20
      }}
      className={`w-full py-8 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedContainer
