import {Metadata} from 'next'
import {origin} from './url'
import {getTranslations} from 'next-intl/server'
import {LOCALE_KEY, LOCALES} from '@/locales'

type MetadataProps = {
  title: string
  description: string
  slug: string
  index: boolean
  locale: LOCALE_KEY
  og: {
    type: 'article' | 'website'
    title?: string
    description?: string
    slug?: string
  }
}

export default async function getMetadata({
  title,
  description,
  slug,
  index = true,
  locale,
  og
}: MetadataProps): Promise<Metadata> {
  const t = await getTranslations()

  const ogUrl = `${origin}/api/og${
    og.type === 'website'
      ? `?title=${og.title}&description=${og.description}&locale=${locale}`
      : `/kb?slug=${og.slug}&locale=${locale}`
  }`
  const ogLocale = LOCALES[locale] || LOCALES.de

  const url = `${origin}${locale !== 'de' ? `/${locale}` : ''}${
    slug === '/' ? '' : slug
  }`

  return {
    title,
    description,
    robots: {
      index,
      follow: index,
      googleBot: {
        index,
        follow: index
      }
    },
    alternates: {
      canonical: url,
      languages: {
        'en-US': `${origin}/en${slug === '/' ? '' : slug}`,
        'de-DE': `${origin}${slug}`,
        'x-default': `${origin}${slug}`
      }
    },
    openGraph: {
      title,
      url,
      locale: ogLocale,
      description,
      type: og.type,
      siteName: t('app.name'),
      images: [
        {
          url: ogUrl,
          type: 'image/png',
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      images: [
        {
          alt: title,
          type: 'image/png',
          width: 1200,
          height: 630,
          url: ogUrl
        }
      ]
    }
  }
}
