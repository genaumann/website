import {getTranslate} from '@/lib/integrations/tolgee/server'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslate('common', {noWrap: true})

  return {
    title: {
      default: t('kb'),
      template: `%s · ${t('kb')} · ${t('appName')}`
    }
  }
}

export default function Layout({children}: {children: React.ReactNode}) {
  return children
}
