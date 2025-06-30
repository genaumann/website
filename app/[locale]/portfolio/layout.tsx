import {getTranslate} from '@/lib/integrations/tolgee/server'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslate()

  return {
    title: {
      default: t('portfolio'),
      template: `%s · ${t('portfolio')} · ${t('appName')}`
    }
  }
}

export default function Layout({children}: {children: React.ReactNode}) {
  return children
}
