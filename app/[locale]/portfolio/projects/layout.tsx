import {LayoutBreadcrumbs} from '@/components/layout/app-breadcrumb'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {getProjects} from '@/lib/projects'
import {LocaleParam} from '@/lib/types'
import {LOCALES} from '@/locales'
import {ReactNode} from 'react'

export default async function Layout({
  children,
  params
}: {
  children: ReactNode
  params: Promise<LocaleParam>
}) {
  const {locale} = await params
  const t = await getTranslate('portfolio')
  const localeKey = locale as keyof typeof LOCALES
  const leafLabels = Object.fromEntries(
    getProjects().map(project => [project.id, project.name[localeKey]])
  )

  return (
    <div className="mt-8">
      <LayoutBreadcrumbs
        items={[
          {href: '/portfolio', label: t('portfolio', {ns: 'common'})},
          {href: '/portfolio/projects', label: t('projects')}
        ]}
        leafLabels={leafLabels}
      />
      {children}
    </div>
  )
}
