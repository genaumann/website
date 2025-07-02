import TechnologyGridPage from './grid'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import {Metadata} from 'next'
import getMetadata from '@/lib/metadata'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {LocaleParam} from '@/lib/types'

export async function generateMetadata({
  params
}: {
  params: Promise<LocaleParam>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslate('portfolio', {noWrap: true})

  return getMetadata({
    title: t('techstack', {ns: 'common'}),
    description: t('appMetadata.description.tools'),
    slug: '/portfolio/tools',
    index: true,
    locale,
    og: {
      type: 'website',
      title: t('techstack', {ns: 'common'}),
      description: t('appMetadata.description.tools')
    }
  })
}

export default async function Page() {
  const t = await getTranslate('portfolio')
  return (
    <div className="container">
      <Breadcrumb className="mt-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/portfolio">{t('portfolio', {ns: 'common'})}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{t('techstack', {ns: 'common'})}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-10">
        <h1 className="text-5xl text-center font-bold">
          {t('techstack', {ns: 'common'})}
        </h1>
        <p className="text-muted-foreground text-center max-w-lg mx-auto text-sm">
          {t('toolsDescription')}
        </p>
        <TechnologyGridPage />
      </div>
    </div>
  )
}
