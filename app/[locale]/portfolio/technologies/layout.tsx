import {LayoutBreadcrumbs} from '@/components/layout/app-breadcrumb'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {getTechnologies} from '@/lib/technologies'
import {ReactNode} from 'react'

export default async function Layout({children}: {children: ReactNode}) {
  const t = await getTranslate('portfolio')
  const leafLabels = Object.fromEntries(
    getTechnologies().map(technology => [technology.slug, technology.name])
  )

  return (
    <>
      <LayoutBreadcrumbs
        items={[
          {href: '/portfolio', label: t('portfolio', {ns: 'common'})},
          {
            href: '/portfolio/technologies',
            label: t('techstack', {ns: 'common'})
          }
        ]}
        leafLabels={leafLabels}
      />
      {children}
    </>
  )
}
