import {ArticleSidebar} from '@/components/kb/sidebar'
import {getArticlesByLocale} from '@/lib/mdx'
import {getTranslations} from 'next-intl/server'
import {ReactNode} from 'react'

export default async function KBLayout({
  children,
  params
}: {
  children: ReactNode
  params: Promise<{locale: string}>
}) {
  const t = await getTranslations()
  const {locale} = await params
  const articles = await getArticlesByLocale(locale)

  return (
    <div className="container md:flex md:flex-row h-full">
      <div className="hidden md:block w-[285px]">
        <p className="text-lg font-semibold mb-4">
          {t('common.knowledgebase')}
        </p>
        <ArticleSidebar articles={articles} />
      </div>
      <article className="prose min-h-[calc(100vh-168px)]">{children}</article>
      <nav className="w-56 hidden lg:block"></nav>
    </div>
  )
}
