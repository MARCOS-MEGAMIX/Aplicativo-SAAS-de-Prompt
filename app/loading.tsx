import React from 'react'

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
      <div className="space-y-4 text-center">
        {/* Spinner */}
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-4 border-purple-200 rounded-full animate-[spin_3s_linear_infinite]" />
          <div className="absolute inset-2 border-4 border-t-purple-600 rounded-full animate-[spin_2s_linear_infinite]" />
        </div>

        {/* Text */}
        <div className="text-muted-foreground animate-pulse">
          Carregando...
        </div>
      </div>
    </div>
  )
}
