import {absoluteRelativePath} from '@/lib/mdx-edge'
import {Grid, GridItem} from './grid'
import {findArticleBySlug} from '@/lib/mdx-edge'
import {getLocale, LOCALES} from '@/locales'
import {getKBPath} from '@/lib/mdx'

type ArticleGridProps = {
  articles: string[]
}

export default async function ArticleGrid({
  articles: _articles
}: ArticleGridProps) {
  const locale = (await getLocale()) as LOCALES

  const kbPath = await getKBPath()
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
