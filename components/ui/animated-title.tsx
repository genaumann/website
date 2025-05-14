'use client'

import React from 'react'
import {motion} from 'framer-motion'
import {cn} from '@/lib/cn'

interface AnimatedTitleProps {
  text: string
  className?: string
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export default function AnimatedTitle({
  text,
  className,
  element: Element = 'h1'
}: AnimatedTitleProps) {
  return (
    <Element
      className={cn(
        'font-bold text-4xl md:text-5xl lg:text-6xl',
        'bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent',
        'relative overflow-hidden',
        className
      )}>
      <motion.span
        className="absolute inset-0 bg-linear-to-r from-primary via-secondary to-primary bg-size-[200%_100%]"
        animate={{
          backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
        }}
        transition={{
          duration: 5,
          ease: 'linear',
          repeat: Infinity
        }}
        style={{
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
        {text}
      </motion.span>
      <span className="invisible">{text}</span>
    </Element>
  )
}
