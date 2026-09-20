'use client'

import {Fragment} from 'react'
import Link from 'next/link'
import {useSelectedLayoutSegment} from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

export type BreadcrumbEntry = {
  label: string
  href?: string
}

export function AppBreadcrumb({
  items,
  className = 'container mt-5'
}: {
  items: BreadcrumbEntry[]
  className?: string
}) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <Fragment key={`${item.label}-${index}`}>
              <BreadcrumbItem>
                {item.href && !isLast ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {isLast ? null : <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function LayoutBreadcrumbs({
  items,
  leafLabels,
  className
}: {
  items: BreadcrumbEntry[]
  leafLabels?: Record<string, string>
  className?: string
}) {
  const leaf = useSelectedLayoutSegment()
  const resolved = leaf
    ? [...items, {label: leafLabels?.[leaf] ?? leaf}]
    : items.map((item, index, arr) =>
        index === arr.length - 1 ? {label: item.label} : item
      )

  return <AppBreadcrumb items={resolved} className={className} />
}
