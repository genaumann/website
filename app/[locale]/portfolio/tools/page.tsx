import {getTranslations} from 'next-intl/server'
import TechnologyGridPage from './grid'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import {LOCALE_KEY} from '@/locales'
import {Metadata} from 'next'
import getMetadata from '@/lib/metadata'

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: LOCALE_KEY}>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslations('portfolio.tools.metadata')

  return getMetadata({
    title: t('title'),
    description: t('description'),
    slug: '/portfolio/tools',
    index: true,
    locale,
    og: {
      type: 'website',
      title: t('title'),
      description: t('description')
    }
  })
}

export default async function Page() {
  const t = await getTranslations('portfolio')
  return (
    <div className="container">
      <Breadcrumb className="mt-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/portfolio">{t('title')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{t('tools.title')}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-10">
        <h1 className="text-5xl text-center font-bold">{t('tools.title')}</h1>
        <p className="text-muted-foreground text-center max-w-lg mx-auto text-sm">
          {t('tools.description')}
        </p>
        <TechnologyGridPage />
      </div>
    </div>
  )
}
