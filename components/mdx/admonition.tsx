import {cn} from '@/lib/cn'
import type React from 'react'
import {
  CircleXIcon,
  CircleAlertIcon,
  InfoIcon,
  CircleCheckIcon
} from 'lucide-react'

export type AdmonitionVariant = 'danger' | 'warning' | 'info' | 'success'

export interface AdmonitionProps {
  title?: string
  children: React.ReactNode
  variant?: AdmonitionVariant
  className?: string
}

const variantStyles: Record<
  AdmonitionVariant,
  {icon: React.ReactNode; container: string; title: string; border: string}
> = {
  danger: {
    icon: <CircleXIcon width={16} height={16} />,
    container: 'bg-red-50 dark:bg-red-950/50',
    title: 'text-red-800 dark:text-red-300',
    border: 'border-l-red-500'
  },
  warning: {
    icon: <CircleAlertIcon width={16} height={16} />,
    container: 'bg-yellow-50 dark:bg-yellow-950/50',
    title: 'text-yellow-800 dark:text-yellow-300',
    border: 'border-l-yellow-500'
  },
  info: {
    icon: <InfoIcon width={16} height={16} />,
    container: 'bg-blue-50 dark:bg-blue-950/50',
    title: 'text-blue-800 dark:text-blue-300',
    border: 'border-l-blue-500'
  },
  success: {
    icon: <CircleCheckIcon width={16} height={16} />,
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
        'my-5 rounded-md border-l-4 p-4',
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
          {styles.icon}
          {title}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}
