import {absoluteRelativePath} from '@/lib/mdx-edge'
import {Grid, GridItem} from './grid'
import {findArticleBySlug} from '@/lib/mdx-edge'
import {getLocale, LOCALE_KEY} from '@/locales'
import {SizeProp} from '@fortawesome/fontawesome-svg-core'
import {headers} from 'next/headers'

type ArticleGridProps = {
  articles: {
    slug: string
    iconSize?: SizeProp
  }[]
}

export default async function ArticleGrid({
  articles: _articles
}: ArticleGridProps) {
  const headersList = await headers()
  const fullpath = headersList.get('x-url') || ''
  const locale = (await getLocale()) as LOCALE_KEY

  const kbPath = fullpath.split('/').slice(2).join('/')
  const articles = await Promise.all(
    _articles.map(
      async article =>
        await findArticleBySlug(
          locale,
          absoluteRelativePath(article.slug, kbPath)
        )
    )
  )

  return (
    <Grid>
      {articles.map((article, index) => {
        const {iconSize} = _articles[index]
        return (
          article && (
            <GridItem
              key={index}
              title={article.title}
              icon={article.icon}
              href={`/kb/${article.slug}`}
              iconPrefix={article.iconPrefix}
              iconSize={iconSize}>
              {article.description}
            </GridItem>
          )
        )
      })}
    </Grid>
  )
}
