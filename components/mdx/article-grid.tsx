import {absoluteRelativePath} from '@/lib/mdx-edge'
import {Grid, GridItem} from './grid'
import {findArticleBySlug} from '@/lib/mdx-edge'
import {getLocale, LOCALES} from '@/locales'
import {headers} from 'next/headers'

type ArticleGridProps = {
  articles: string[]
}

export default async function ArticleGrid({
  articles: _articles
}: ArticleGridProps) {
  const headersList = await headers()
  const fullpath = headersList.get('x-url') || ''
  const locale = (await getLocale()) as LOCALES

  const kbPath = fullpath.replace(/^\/en/, '').split('/').slice(2).join('/')
  const articles = await Promise.all(
    _articles.map(
      async article =>
        await findArticleBySlug(locale, absoluteRelativePath(article, kbPath))
    )
  )

  return (
    <Grid>
      {articles.map((article, index) => {
        return (
          article && (
            <GridItem
              key={index}
              title={article.title}
              href={`/kb/${article.slug}`}>
              {article.description}
            </GridItem>
          )
        )
      })}
    </Grid>
  )
}
