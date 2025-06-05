import {getTranslations, LOCALE_KEY} from '@/locales'
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
  params: Promise<{locale: LOCALE_KEY; tool: string}>
}): Promise<Metadata> {
  const {locale, tool} = await params
  const tools = toolsData(await getTranslations('portfolio.tools'))
  const config = tools.find(_ => _.slug === tool)
  const t = await getTranslations('portfolio.tools.metadata')

  return getMetadata({
    title: config?.name || t('title'),
    description: t('descriptionTool', {
      tool: config?.name || tool
    }),
    slug: `/portfolio/tools/${tool}`,
    index: true,
    locale,
    og: {
      type: 'website',
      title: config?.name || t('title'),
      description: t('descriptionTool', {
        tool: config?.name || tool
      })
    }
  })
}

export default async function Page({
  params
}: {
  params: Promise<{locale: LOCALE_KEY; tool: string}>
}) {
  const {tool, locale} = await params
  const tools = toolsData(await getTranslations('portfolio.tools'))
  const t = await getTranslations('portfolio')
  const config = tools.find(_ => _.slug === tool)

  if (!config) notFound()

  return (
    <>
      <Breadcrumb className="container mt-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/portfolio">{t('title')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/portfolio/tools">{t('tools.title')}</Link>
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
