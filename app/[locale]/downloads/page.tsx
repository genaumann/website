import DownloadPDFButton from '@/components/pdf/download-button'
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {BreadcrumbItem} from '@/components/ui/breadcrumb'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import getMetadata from '@/lib/metadata'
import {getProjects} from '@/lib/projects'
import {LocaleParam} from '@/lib/types'
import {Metadata} from 'next'
import Link from 'next/link'

export async function generateMetadata({
  params
}: {
  params: Promise<LocaleParam>
}): Promise<Metadata> {
  const {locale} = await params
  const t = await getTranslate('portfolio', {noWrap: true})
  return getMetadata({
    title: t('downloads', {ns: 'common'}),
    description: t('appMetadata.description.downloads'),
    slug: '/downloads',
    index: true,
    locale,
    og: {
      type: 'website',
      title: t('downloads', {ns: 'common'}),
      description: t('appMetadata.description.downloads')
    }
  })
}

export default async function DownloadPage({
  params
}: {
  params: Promise<LocaleParam>
}) {
  const t = await getTranslate('portfolio')
  const projects = getProjects()
  const {locale} = await params

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
              <Link href="/downloads">{t('downloads', {ns: 'common'})}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="container">
        <h1 className="text-5xl md:text-6xl font-bold py-12 text-center">
          {t('downloads', {ns: 'common'})}
        </h1>
        <div className="flex flex-row gap-4 justify-center items-center">
          <DownloadPDFButton file="cv" label="Download CV" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold pt-12 text-center">
          {t('projects')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12">
          {projects.map(project => (
            <div
              key={project.id}
              className="flex flex-col justify-center items-center border border-muted rounded-md p-4 gap-4">
              <span className="text-xl font-bold font-oswald text-center">
                {project.name?.[locale as keyof typeof project.name]}
              </span>
              <DownloadPDFButton
                file="project"
                projectid={project.id}
                size="sm"
                variant="outline"
                className="p-1.5 font-inter border-foreground"
                label={t('downloadProjectRef', {ns: 'portfolio'})}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
