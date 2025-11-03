import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {StatusBadge} from '@/components/ui/project-card'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {getProject, getProjects} from '@/lib/projects'
import {LocaleParam} from '@/lib/types'
import {LOCALES} from '@/locales'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {MDXContent} from '@/components/mdx'
import {Fragment} from 'react'
import {ProjectTechnologyBadge} from '@/components/ui/project-badges'
import {
  ProjectContextBadge,
  ProjectDateBadge
} from '@/components/ui/project-badges'
import {ChevronLeftIcon, ChevronRightIcon} from '@radix-ui/react-icons'
import getMetadata from '@/lib/metadata'
import {Metadata} from 'next'
import DownloadPDFButton from '@/components/pdf/download-button'

type ProjectParam = LocaleParam & {
  project: string
}

// 404 for unspecified projects
export const dynamicParams = false

export async function generateStaticParams() {
  const projects = getProjects()
  return projects
    .map(project =>
      Object.values(LOCALES).map(locale => ({
        project: project.id,
        locale
      }))
    )
    .flat()
}

export async function generateMetadata({
  params
}: {
  params: Promise<ProjectParam>
}): Promise<Metadata> {
  const {project: projectId, locale} = await params
  const localeKey = locale as keyof typeof LOCALES
  const t = await getTranslate('portfolio', {noWrap: true})
  const project = getProject({id: projectId})
  if (!project) return {}

  return getMetadata({
    title: project.name[localeKey],
    description: t('appMetadata.description.projectref', {
      name: project.name[localeKey]
    }),
    slug: `/portfolio/projects/${projectId}`,
    index: true,
    locale,
    og: {
      type: 'website',
      title: project.name[localeKey],
      description: project.content[localeKey].project_overview
    }
  })
}

export default async function Page({params}: {params: Promise<ProjectParam>}) {
  const {project: projectId, locale} = await params
  const localeKey = locale as keyof typeof LOCALES
  const t = await getTranslate('portfolio')
  const project = getProject({id: projectId})

  if (!project) notFound()

  const allProjects = getProjects()
  const currentIndex = allProjects.findIndex(p => p.id === projectId)

  const prevIndex =
    currentIndex === 0 ? allProjects.length - 1 : currentIndex - 1
  const nextIndex =
    currentIndex === allProjects.length - 1 ? 0 : currentIndex + 1

  const prevProject = allProjects[prevIndex]
  const nextProject = allProjects[nextIndex]

  const contentMap = [
    {
      translationKey: 'challenge',
      content: project.content[localeKey].challenge
    },
    {
      translationKey: 'goals',
      content: project.content[localeKey].goals
    },
    {
      translationKey: 'approach',
      content: project.content[localeKey].approach
    },
    {
      translationKey: 'implementation',
      content: project.content[localeKey].implementation
    },
    {
      translationKey: 'results',
      content: project.content[localeKey].results
    },
    {
      translationKey: 'insights',
      content: project.content[localeKey].insights
    }
  ]

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
              <Link href="/portfolio/projects">
                {t('projects', {ns: 'portfolio'})}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{project.name[localeKey]}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article id="project">
        <div className="container py-10">
          <div className="bg-muted/20 rounded-lg p-4 md:p-8 relative">
            <h1 className="text-4xl md:text-6xl font-bold text-center md:leading-16">
              {project.name[localeKey]}
            </h1>
            <StatusBadge
              start={project.start}
              end={project.end}
              t={t}
              className="font-oswald absolute -right-2 -top-3"
            />
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="pt-4 flex gap-4 flex-wrap">
              <ProjectDateBadge
                start={project.start}
                end={project.end}
                locale={locale}
              />
              <ProjectContextBadge context={project.context} t={t} />
            </div>
            <DownloadPDFButton
              file="project"
              size="sm"
              variant="outline"
              className="p-1.5 font-inter border-foreground"
              projectid={project.id}
              label={t('downloadProjectRef', {ns: 'portfolio'})}
            />
          </div>
          <div className="pt-10 prose dark:prose-invert md:max-w-2/3 mx-auto md:text-center">
            <MDXContent source={project.content[localeKey].project_overview} />
          </div>
        </div>

        <section className="[&>div:nth-child(odd)]:bg-muted/20">
          {contentMap.map(item => (
            <Fragment key={item.translationKey}>
              {item.content && (
                <div key={item.translationKey}>
                  <div className="container py-10">
                    <div className="grid grid-cols-1 md:grid-cols-[20rem_1fr] gap-x-10 gap-y-8 items-start">
                      <h2 className="text-2xl md:text-3xl font-bold">
                        {t(item.translationKey, {ns: 'portfolio'})}
                      </h2>
                      <div className="prose dark:prose-invert max-w-none">
                        <MDXContent source={item.content} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </section>

        <section className="container py-10">
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex justify-center items-center text-sm gap-4">
              <div className="flex gap-2 items-center flex-wrap">
                {project.technologies.map(technology => (
                  <ProjectTechnologyBadge
                    key={technology}
                    technologyName={technology}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        <hr className="border-muted border-dashed" />

        <section className="container py-10 no-print">
          <div className="flex justify-between items-center gap-4">
            <Link
              href={`/portfolio/projects/${prevProject.id}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <ChevronLeftIcon className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">
                  {t('previousProject')}
                </div>
                <div className="font-semibold font-oswald">
                  {prevProject.name[localeKey]}
                </div>
              </div>
            </Link>

            <Link
              href={`/portfolio/projects/${nextProject.id}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <div className="text-right">
                <div className="text-xs text-muted-foreground">
                  {t('nextProject')}
                </div>
                <div className="font-semibold font-oswald">
                  {nextProject.name[localeKey]}
                </div>
              </div>
              <ChevronRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </article>
    </>
  )
}
