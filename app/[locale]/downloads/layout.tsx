import {AppBreadcrumb} from '@/components/layout/app-breadcrumb'
import {getTranslate} from '@/lib/integrations/tolgee/server'
import {ReactNode} from 'react'

export default async function Layout({children}: {children: ReactNode}) {
  const t = await getTranslate('portfolio')

  return (
    <div className="mt-8">
      <AppBreadcrumb
        items={[
          {href: '/portfolio', label: t('portfolio', {ns: 'common'})},
          {label: t('downloads', {ns: 'common'})}
        ]}
      />
      {children}
    </div>
  )
}
