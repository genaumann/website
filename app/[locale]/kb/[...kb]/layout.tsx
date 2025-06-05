import {ArticleSidebar} from '@/components/kb/sidebar'
import {getArticlesByLocale} from '@/lib/mdx'
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
import {findArticleBySlug} from '@/lib/mdx-edge'
import {LOCALE_KEY} from '@/locales'
import Link from 'next/link'

export default async function KBLayout({
  children,
  params
}: {
  children: ReactNode
  params: Promise<{locale: LOCALE_KEY; kb: string[]}>
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
      {/* Left sidebar */}
      <div className="hidden md:block border-r border-muted border-dashed shrink-0">
        <div className="sticky top-28 overflow-auto">
          <p className="text-lg font-semibold mb-4">
            {t('common.knowledgebase')}
          </p>
          <ArticleSidebar articles={articles} />
        </div>
      </div>

      {/* Main content */}
      <div className="min-h-[calc(100vh-227px)] mb-6 relative flex-1 min-w-0">
        <div className="sticky top-[97px] bg-background/75 backdrop-blur border-b border-muted border-dashed py-2 md:py-1 -mx-8 md:-mx-5 h-fit md:h-[62px] z-10">
          <div className="container md:px-5 flex justify-between">
            <MobileSidebar articles={articles} />
            <Search locale={locale} />
          </div>
        </div>
        <Breadcrumb className="mb-6 pt-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-muted-foreground" asChild>
                <Link href="/kb">{t('common.knowledgebase')}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1
              return (
                <Fragment key={index}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <>{item?.title}</>
                    ) : (
                      <BreadcrumbLink className="text-muted-foreground" asChild>
                        <Link href={`/kb/${item?.slug}`}>{item?.title}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {isLast || <BreadcrumbSeparator />}
                </Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <article className="prose max-w-full">{children}</article>
      </div>

      {/* TOC */}
      <div className="w-52 hidden lg:block border-l border-dashed border-muted ps-4 shrink-0">
        <div className="sticky top-28 overflow-auto">
          <p className="text-lg font-semibold mb-4">{t('kb.toc')}</p>
          <TocWrapper />
        </div>
      </div>
    </div>
  )
}
