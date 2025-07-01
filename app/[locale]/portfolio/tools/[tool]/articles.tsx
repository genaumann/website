import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {LOCALES} from '@/locales'
import {getArticlesByKeyword} from '@/lib/mdx'
import Icon from '@/components/ui/icon'
import {getDateFunctions} from '@/lib/dates'
import Link from 'next/link'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {LocaleParam} from '@/lib/types'

type ToolArticlesPageProps = LocaleParam & {
  tool: string
  title: string
}

export default async function ToolArticlesPage({
  tool,
  title,
  locale
}: ToolArticlesPageProps) {
  const allArticles = await getArticlesByKeyword(locale, tool)
  const {format} = getDateFunctions(LOCALES[locale])
  const t = await getTranslate('portfolio')

  if (!allArticles || allArticles.length === 0) return null

  const articles = allArticles
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 3)

  return (
    <section className="py-10">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {t('kbArticles', {ns: 'common'})}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('latestKBArticles', {technology: title})}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <Link
              href={`/kb/${article.slug}`}
              key={article.slug}
              className="group">
              <Card className="border border-muted">
                <div className="aspect-video rounded-t-lg flex items-center justify-center">
                  <Icon
                    name={article.icon || 'newspaper'}
                    prefix={article.iconPrefix}
                    className="text-8xl transition-transform duration-300 ease-in-out group-hover:scale-150"
                  />
                </div>
                <CardHeader className="bg-background rounded-b-xl">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                    <span className="font-semibold">
                      {format(article.updatedAt, 'dd.MM.yyyy')}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2 text-2xl font-bold">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {article.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
