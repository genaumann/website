import {getTranslate} from '@/lib/integrations/tolgee/server'
import {MetadataRoute} from 'next'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslate()
  return {
    name: t('appName'),
    short_name: t('appName'),
    description: t('appMetadata.description'),
    start_url: '/',
    display: 'standalone',
    background_color: '#fafffb',
    theme_color: '#00b32d',
    icons: [
      {
        src: '/icon.png',
        sizes: '96x96',
        purpose: 'any',
        type: 'image/x-icon'
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        purpose: 'any',
        type: 'image/png'
      }
    ]
  }
}
