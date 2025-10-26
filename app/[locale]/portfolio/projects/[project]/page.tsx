import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {StatusBadge} from '@/components/ui/project-card'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {getProject} from '@/lib/projects'
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

type ProjectParam = LocaleParam & {
  project: string
}

export default async function Page({params}: {params: Promise<ProjectParam>}) {
  const {project: projectId, locale} = await params
  const localeKey = locale as keyof typeof LOCALES
  const t = await getTranslate('portfolio')
  const project = getProject({id: projectId})

  if (!project) notFound()

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

      <div className="container py-10">
        <div className="bg-muted/20 rounded-lg p-4 md:p-8 relative">
          <h1 className="text-4xl md:text-6xl font-bold text-center">
            {project.name[localeKey]}
          </h1>
          <StatusBadge
            start={project.start}
            end={project.end}
            t={t}
            className="absolute -right-2 -top-3"
          />
        </div>
        <div className="pt-4 flex gap-4 text-sm text-muted-foreground justify-center">
          <ProjectDateBadge
            start={project.start}
            end={project.end}
            locale={locale}
          />
          <ProjectContextBadge context={project.context} t={t} />
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

      <hr className="border-muted border-dashed" />

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
    </>
  )
}
