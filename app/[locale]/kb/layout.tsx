import {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()

  return {
    title: {
      default: t('kb.title.short'),
      template: `%s · ${t('kb.title.short')} · ${t('app.name')}`
    }
  }
}

export default function Layout({children}: {children: React.ReactNode}) {
  return children
}
