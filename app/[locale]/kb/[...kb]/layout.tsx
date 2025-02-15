import {ArticleSidebar} from '@/components/kb/sidebar'
import {findArticleBySlug, getArticlesByLocale} from '@/lib/mdx'
import {getTranslations} from 'next-intl/server'
import {Fragment, ReactNode} from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

export default async function KBLayout({
  children,
  params
}: {
  children: ReactNode
  params: Promise<{locale: string; kb: string[]}>
}) {
  const t = await getTranslations()
  const {locale, kb} = await params
  const articles = await getArticlesByLocale(locale)

  const breadcrumbs = await Promise.all(
    kb.map(async (_, index) => {
      const breadcrumbArticle = await findArticleBySlug(
        locale,
        kb.slice(0, index + 1).join('/')
      )
      return breadcrumbArticle
    })
  )

  return (
    <div className="container md:flex md:flex-row h-full">
      <div className="hidden md:block w-[285px]">
        <p className="text-lg font-semibold mb-4">
          {t('common.knowledgebase')}
        </p>
        <ArticleSidebar articles={articles} />
      </div>
      <div className="min-h-[calc(100vh-168px)]">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-muted-foreground" href="/kb">
                {t('common.knowledgebase')}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {breadcrumbs.map((item, index) => {
              return (
                <Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      className="text-muted-foreground"
                      href={`/kb/${item?.slug}`}>
                      {item?.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <article className="prose">{children}</article>
      </div>
      <nav className="w-56 hidden lg:block"></nav>
    </div>
  )
}
