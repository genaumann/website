'use client'

import type React from 'react'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useState, useEffect} from 'react'
import {ScrollArea} from '@/components/ui/scroll-area'
import {Article} from '@/lib/types'
import Icon from '@/components/ui/icon'
import {Button} from '../ui/button'
import {cn} from '@/lib/cn'
import {useTranslations} from 'next-intl'

const ArticleList = ({
  articles,
  currentPath,
  expandedSlugs,
  setExpandedSlugs
}: {
  articles: Article[]
  currentPath: string
  expandedSlugs: string[]
  setExpandedSlugs: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  const toggleExpand = (slug: string) => {
    setExpandedSlugs(prev => {
      const clearedSlug = slug.replace(/\/index$/, '')
      return prev.includes(clearedSlug)
        ? prev.filter(s => s !== clearedSlug)
        : [...prev, clearedSlug]
    })
  }

  return (
    <ul>
      {articles.map(article => {
        const isCurrentArticle =
          currentPath === `/kb/${article.slug.replace(/\/index$/, '')}`
        const isExpanded = expandedSlugs.includes(
          article.slug.replace(/\/index$/, '')
        )
        const hasChildren = article.children && article.children.length > 0

        return (
          <li key={article.slug}>
            <div className="flex justify-between items-center pe-3">
              <Link
                href={`/kb/${article.slug}`}
                className={cn(
                  'hover:underline flex-grow py-2 text-muted-foreground',
                  isCurrentArticle && 'text-primary/60'
                )}>
                {article.title}
              </Link>
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-inherit"
                  onClick={() => toggleExpand(article.slug)}>
                  {isExpanded ? (
                    <Icon name="chevron-down" />
                  ) : (
                    <Icon name="chevron-right" />
                  )}
                </Button>
              )}
            </div>
            {hasChildren && isExpanded && (
              <ul className="pl-4 space-y-1 border-l border-muted">
                <ArticleList
                  articles={article.children as Article[]}
                  currentPath={currentPath}
                  expandedSlugs={expandedSlugs}
                  setExpandedSlugs={setExpandedSlugs}
                />
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function ArticleSidebar({articles}: {articles: Article[]}) {
  const t = useTranslations()
  const pathname = usePathname()
  const [expandedSlugs, setExpandedSlugs] = useState<string[]>([])

  useEffect(() => {
    const slugs = pathname.split('/').slice(2)
    const parentSlugs = slugs.map((_, index) =>
      slugs.slice(0, index + 1).join('/')
    )
    setExpandedSlugs(parentSlugs)
  }, [pathname])

  return (
    <nav className="md:w-64 w-full">
      <ScrollArea className="h-full">
        <ArticleList
          articles={articles}
          currentPath={pathname}
          expandedSlugs={expandedSlugs}
          setExpandedSlugs={setExpandedSlugs}
        />
      </ScrollArea>
    </nav>
  )
}
