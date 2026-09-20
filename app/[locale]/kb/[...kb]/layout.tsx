import {ArticleSidebar} from '@/components/kb/sidebar'
import {AppBreadcrumb} from '@/components/layout/app-breadcrumb'
import {getArticlesByLocale} from '@/lib/mdx'
import {ReactNode} from 'react'
import MobileSidebar from '@/components/kb/sidebar-mobile'
import Search from '@/components/kb/search'
import TocWrapper from '@/components/kb/toc/wrapper'
import {findArticleBySlug} from '@/lib/mdx-edge'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {LocaleParam} from '@/lib/types'

export default async function KBLayout({
  children,
  params
}: {
  children: ReactNode
  params: Promise<LocaleParam & {kb: string[]}>
}) {
  const t = await getTranslate('kb')
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
    <div className="container min-h-content md:flex md:flex-row md:gap-5 h-full relative">
      {/* Left sidebar */}
      <div className="hidden md:block border-r border-muted border-dashed shrink-0">
        <div className="sticky top-24 overflow-auto">
          <span className="text-lg font-semibold mb-4 font-oswald">
            {t('kb', {ns: 'common'})}
          </span>
          <ArticleSidebar articles={articles} />
        </div>
      </div>

      {/* Main content */}
      <div className="mb-6 relative flex-1 min-w-0">
        <div className="sticky top-[80px] bg-background/75 backdrop-blur border-b border-muted border-dashed -mx-8 md:-mx-5 h-fit md:h-[62px] z-10 flex">
          <div className="container md:px-5 flex items-center">
            <MobileSidebar articles={articles} />
            <Search locale={locale} />
          </div>
        </div>
        <AppBreadcrumb
          className="mb-6 pt-5"
          items={[
            {href: '/kb', label: t('kb', {ns: 'common'})},
            ...breadcrumbs.flatMap((item, index) => {
              if (!item) return []
              const isLast = index === breadcrumbs.length - 1
              return [
                {
                  label: item.title,
                  href: isLast
                    ? undefined
                    : `/kb/${item.slug.replace(/\/index$/, '')}`
                }
              ]
            })
          ]}
        />
        <article id="kb" className="prose max-w-full">
          {children}
        </article>
      </div>

      {/* TOC */}
      <div className="w-52 hidden lg:block border-l border-dashed border-muted ps-4 shrink-0 font-oswald">
        <div className="sticky top-24 overflow-auto">
          <span className="text-lg font-semibold mb-4">{t('toc')}</span>
          <TocWrapper />
        </div>
      </div>
    </div>
  )
}
