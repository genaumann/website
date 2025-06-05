import {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const tApp = await getTranslations('app')
  const t = await getTranslations('portfolio.metadata')

  return {
    title: {
      default: t('title'),
      template: `%s · ${t('title')} · ${tApp('name')}`
    }
  }
}

export default function Layout({children}: {children: React.ReactNode}) {
  return children
}
