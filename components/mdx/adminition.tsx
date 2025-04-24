import {cn} from '@/lib/cn'
import type React from 'react'
import Icon, {IconName} from '../ui/icon'

export type AdmonitionVariant = 'danger' | 'warning' | 'info' | 'success'

export interface AdmonitionProps {
  title?: string
  children: React.ReactNode
  variant?: AdmonitionVariant
  className?: string
}

const variantStyles: Record<
  AdmonitionVariant,
  {icon: IconName; container: string; title: string; border: string}
> = {
  danger: {
    icon: 'circle-xmark',
    container: 'bg-red-50 dark:bg-red-950/50',
    title: 'text-red-800 dark:text-red-300',
    border: 'border-l-red-500'
  },
  warning: {
    icon: 'circle-exclamation',
    container: 'bg-yellow-50 dark:bg-yellow-950/50',
    title: 'text-yellow-800 dark:text-yellow-300',
    border: 'border-l-yellow-500'
  },
  info: {
    icon: 'circle-info',
    container: 'bg-blue-50 dark:bg-blue-950/50',
    title: 'text-blue-800 dark:text-blue-300',
    border: 'border-l-blue-500'
  },
  success: {
    icon: 'circle-check',
    container: 'bg-green-50 dark:bg-green-950/50',
    title: 'text-green-800 dark:text-green-300',
    border: 'border-l-green-500'
  }
}

export default function Admonition({
  title,
  children,
  variant = 'info',
  className
}: AdmonitionProps) {
  const styles = variantStyles[variant] || variantStyles.info

  return (
    <div
      className={cn(
        'my-6 rounded-md border-l-4 p-4',
        styles.container,
        styles.border,
        className
      )}>
      {title && (
        <div
          className={cn(
            'mb-2 flex items-center gap-2 font-medium',
            styles.title
          )}>
          <Icon name={styles.icon} />
          {title}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}
