import {tools as toolsData} from '../../../../../lib/tools'
import {notFound} from 'next/navigation'
import TechnologyArticlesPage from './articles'
import TechnologyCertsPage from './certs'
import TechnologyProjectsPage from './projects'
import TechnologyIntroPage from './intro'
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
import {LOCALES} from '@/locales'
import {getTechnology} from '@/lib/technologies'

type ToolParam = LocaleParam & {
  technology: string
}

// 404 for unspecified tools
export const dynamicParams = false

export async function generateStaticParams() {
  const tools = toolsData()
  return tools
    .map(tool =>
      Object.values(LOCALES).map(locale => ({
        locale,
        technology: tool.slug
      }))
    )
    .flat()
}

export async function generateMetadata({
  params
}: {
  params: Promise<ToolParam>
}): Promise<Metadata> {
  const {locale, technology} = await params
  const t = await getTranslate('portfolio', {noWrap: true})
  const technologyData = getTechnology(technology)
  if (!technologyData) return {}

  return getMetadata({
    title: technologyData.name || t('techstack', {ns: 'common'}),
    description: t('appMetadata.description.tool', {
      tool: technologyData.name || technology
    }),
    slug: `/portfolio/technologies/${technology}`,
    index: true,
    locale,
    og: {
      type: 'website',
      title: technologyData.name || t('techstack', {ns: 'common'}),
      description: t('appMetadata.description.tool', {
        tool: technologyData.name || technology
      })
    }
  })
}

export default async function Page({params}: {params: Promise<ToolParam>}) {
  const {technology, locale} = await params
  const t = await getTranslate('portfolio')
  const technologyData = getTechnology(technology)

  if (!technologyData) notFound()

  return (
    <>
      <Breadcrumb className="container mt-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/portfolio">{t('portfolio', {ns: 'common'})}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/portfolio/technologies">
                {t('techstack', {ns: 'common'})}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{technologyData.name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="[&>section:nth-child(even)]:bg-muted/20">
        <TechnologyIntroPage technology={technologyData} locale={locale} />
        <TechnologyCertsPage
          technology={technology}
          title={technologyData.name}
        />
        <TechnologyProjectsPage
          technology={technology}
          title={technologyData.name}
        />
        <TechnologyArticlesPage
          technology={technology}
          locale={locale}
          title={technologyData.name}
        />
      </div>
    </>
  )
}
