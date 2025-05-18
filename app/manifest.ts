import {MetadataRoute} from 'next'
import {getTranslations} from 'next-intl/server'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations()
  return {
    name: t('app.name'),
    short_name: t('app.shortName'),
    description: t('app.metadata.description'),
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
