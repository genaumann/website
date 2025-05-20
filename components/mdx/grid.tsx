import {ReactNode} from 'react'
import Link from 'next/link'
import {cn} from '@/lib/cn'

interface GridItemProps {
  title: string
  href?: string
  children: ReactNode
}

export function Grid({children}: {children: ReactNode}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
      {children}
    </div>
  )
}

export function GridItem({title, href, children}: GridItemProps) {
  return (
    <div
      className={cn(
        'border relative border-input rounded-md p-4 bg-secondary/40',
        href && 'hover:ring hover:ring-primary'
      )}>
      {title && <strong className="text-xl">{title}</strong>}
      {href && (
        <Link href={href}>
          <span className="absolute -inset-px rounded-md" />
        </Link>
      )}
      <div className="text-muted-foreground">{children}</div>
    </div>
  )
}
