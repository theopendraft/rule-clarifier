'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  priority = false 
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 600}
        loading={priority ? 'eager' : 'lazy'}
        quality={75}
        className={`
          duration-300 ease-in-out
          ${isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0'}
        `}
        onLoadingComplete={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}
