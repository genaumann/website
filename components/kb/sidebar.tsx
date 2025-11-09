'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useState, useEffect, useMemo} from 'react'
import {ScrollArea} from '@/components/ui/scroll-area'
import {Article} from '@/lib/types'
import Icon from '@/components/ui/icon'
import {Button} from '../ui/button'
import {cn} from '@/lib/cn'
import {useTranslate} from '@tolgee/react'

const ArticleList = ({
  articles,
  currentPath,
  expandedSlugs,
  onToggleExpanded
}: {
  articles: Article[]
  currentPath: string
  expandedSlugs: string[]
  onToggleExpanded: (slug: string) => void
}) => {
  const {t} = useTranslate()

  return (
    <ul>
      {articles.map(article => {
        const isCurrentArticle =
          currentPath.replace(/^\/en/, '') ===
          `/kb/${article.slug.replace(/\/index$/, '')}`
        const isExpanded = expandedSlugs.includes(
          article.slug.replace(/\/index$/, '')
        )
        const hasChildren = article.children && article.children.length > 0

        return (
          <li key={article.slug}>
            <div className="flex justify-between items-center pe-3">
              <Link
                href={`/kb/${article.slug.replace(/\/index$/, '')}`}
                className={cn(
                  'hover:underline grow py-2 text-muted-foreground font-oswald',
                  isCurrentArticle && 'font-medium text-foreground'
                )}>
                {article.title}
              </Link>
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-inherit"
                  aria-label={isExpanded ? t('deflateMenu') : t('expandMenu')}
                  aria-expanded={isExpanded}
                  onClick={() => onToggleExpanded(article.slug)}>
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
                  onToggleExpanded={onToggleExpanded}
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
  const pathname = usePathname()

  const initialExpandedSlugs = useMemo(() => {
    const slugs = pathname.replace(/^\/en/, '').split('/').slice(2)
    return slugs.map((_, index) => slugs.slice(0, index + 1).join('/'))
  }, [pathname])

  const [expandedSlugs, setExpandedSlugs] =
    useState<string[]>(initialExpandedSlugs)

  useEffect(() => {
    setExpandedSlugs(initialExpandedSlugs)
  }, [initialExpandedSlugs])

  const toggleExpandedSlugs = (slug: string) => {
    const clearedPath = slug.replace(/\/index$/, '')
    setExpandedSlugs(prev =>
      prev.includes(clearedPath)
        ? prev.filter(s => s !== clearedPath).sort()
        : [...prev, clearedPath].sort()
    )
  }

  return (
    <nav className="md:w-64 w-full">
      <ScrollArea className="h-full">
        <ArticleList
          articles={articles}
          currentPath={pathname}
          expandedSlugs={expandedSlugs}
          onToggleExpanded={toggleExpandedSlugs}
        />
      </ScrollArea>
    </nav>
  )
}
