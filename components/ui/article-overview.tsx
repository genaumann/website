import type React from 'react'
import {Article} from '@/lib/types'
import Icon from './icon'
import Link from 'next/link'

function ArticleItem({article, depth}: {article: Article; depth: number}) {
  return (
    <>
      <Link
        href={`/kb/${article.slug}`}
        className="flex items-center space-x-2 py-2 px-3 hover:bg-accent rounded-xl">
        <span
          className="text-muted-foreground text-2xl"
          style={{marginLeft: `${depth * 20}px`}}>
          <Icon
            name={article.icon ? article.icon : 'newspaper'}
            prefix={article.iconPrefix || 'fal'}
          />
        </span>
        <div className="block">
          <span className="text-primary text-xl tracking-tight font-semibold">
            {article.title}
          </span>
          {article.description && (
            <p className="text-secondary-foreground">{article.description}</p>
          )}
        </div>
      </Link>
      {article.children && (
        <div className="ml-4">
          {article.children.map(child => (
            <ArticleItem key={child.slug} article={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </>
  )
}

export function ArticleOverview({articles}: {articles: Article[]}) {
  return (
    <div className="space-y-2 py-4">
      {articles.map(article => (
        <ArticleItem key={article.slug} article={article} depth={0} />
      ))}
    </div>
  )
}
