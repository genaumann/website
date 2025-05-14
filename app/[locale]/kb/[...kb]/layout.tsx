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
import MobileSidebar from '@/components/kb/sidebar-mobile'
import Search from '@/components/kb/search'
import TocWrapper from '@/components/kb/toc/wrapper'

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
    <div className="container md:flex md:flex-row md:gap-5 h-full relative">
      <div className="hidden md:block border-r border-muted border-dashed">
        <div className="sticky top-28 overflow-auto">
          <p className="text-lg font-semibold mb-4">
            {t('common.knowledgebase')}
          </p>
          <ArticleSidebar articles={articles} />
        </div>
      </div>
      <div className="min-h-[calc(100vh-195px)] md:grow mb-6 relative">
        <div className="sticky top-[97px] bg-background/75 backdrop-blur border-b border-muted border-dashed py-2 md:py-1 -mx-8 md:-mx-5 h-fit md:h-[62px] z-10">
          <div className="container md:px-5 flex justify-between">
            <MobileSidebar articles={articles} />
            <Search locale={locale} />
          </div>
        </div>
        <Breadcrumb className="mb-6 pt-5">
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
      <div className="min-w-52 hidden lg:block border-l border-dashed border-muted ps-4">
        <div className="sticky top-28 overflow-auto">
          <p className="text-lg font-semibold mb-4">{t('kb.toc')}</p>
          <TocWrapper />
        </div>
      </div>
    </div>
  )
}
