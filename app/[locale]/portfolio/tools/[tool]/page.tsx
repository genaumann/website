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

type ToolParam = LocaleParam & {
  tool: string
}

// 404 for unspecified tools
export const dynamicParams = false

export async function generateStaticParams() {
  const tools = toolsData()
  return tools.flatMap(tool => [
    {
      locale: 'de',
      tool: tool.slug
    },
    {
      locale: 'en',
      tool: tool.slug
    }
  ])
}

export async function generateMetadata({
  params
}: {
  params: Promise<ToolParam>
}): Promise<Metadata> {
  const {locale, tool} = await params
  const t = await getTranslate('portfolio', {noWrap: true})
  const tools = toolsData(t)
  const config = tools.find(_ => _.slug === tool)

  return getMetadata({
    title: config?.name || t('techstack', {ns: 'common'}),
    description: t('appMetadata.description.tool', {
      tool: config?.name || tool
    }),
    slug: `/portfolio/tools/${tool}`,
    index: true,
    locale,
    og: {
      type: 'website',
      title: config?.name || t('techstack', {ns: 'common'}),
      description: t('appMetadata.description.tool', {
        tool: config?.name || tool
      })
    }
  })
}

export default async function Page({params}: {params: Promise<ToolParam>}) {
  const {tool, locale} = await params
  const t = await getTranslate('portfolio')
  const tools = toolsData(t)
  const config = tools.find(_ => _.slug === tool)

  if (!config) notFound()

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
              <Link href="/portfolio/tools">
                {t('techstack', {ns: 'common'})}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{config.name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="[&>section:nth-child(even)]:bg-muted/20">
        <TechnologyIntroPage tool={config} />
        <TechnologyCertsPage tool={tool} title={config.name} />
        <TechnologyProjectsPage
          technology={tool}
          locale={locale}
          title={config.name}
        />
        <TechnologyArticlesPage
          tool={tool}
          locale={locale}
          title={config.name}
        />
      </div>
    </>
  )
}
