'use server'

import {getFlatArticleIndex} from '@/lib/mdx'
import {MetadataRoute} from 'next'
import {tools as getAllTools} from '@/lib/tools'
import {LOCALES} from '@/locales'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getFlatArticleIndex(LOCALES.de)
  const allTools = getAllTools()

  return [
    {
      url: '/',
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          de: `/`,
          en: `/en`,
          'x-default': `/`
        }
      }
    },
    {
      url: `/privacy`,
      changeFrequency: 'yearly',
      priority: 0.1,
      alternates: {
        languages: {
          de: `/privacy`,
          en: `/en/privacy`,
          'x-default': `/privacy`
        }
      }
    },
    {
      url: `/imprint`,
      changeFrequency: 'yearly',
      priority: 0.1,
      alternates: {
        languages: {
          de: `/imprint`,
          en: `/en/imprint`,
          'x-default': `/imprint`
        }
      }
    },
    {
      url: `/portfolio`,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          de: `/portfolio`,
          en: `/en/portfolio`,
          'x-default': `/portfolio`
        }
      }
    },
    {
      url: `/contact`,
      changeFrequency: 'yearly',
      priority: 0.4,
      alternates: {
        languages: {
          de: `/contact`,
          en: `/en/contact`,
          'x-default': `/contact`
        }
      }
    },
    {
      url: `/portfolio/tools`,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          de: `/portfolio/tools`,
          en: `/en/portfolio/tools`,
          'x-default': `/portfolio/tools`
        }
      }
    },
    ...allTools.map(tool => ({
      url: `/portfolio/tools/${tool.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
      alternates: {
        languages: {
          de: `/portfolio/tools/${tool.slug}`,
          en: `/en/portfolio/tools/${tool.slug}`,
          'x-default': `/portfolio/tools/${tool.slug}`
        }
      }
    })),
    ...articles.map(article => ({
      url: `/kb/${article.slug.replace(/\/index$/, '')}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      lastModified: article.updatedAt,
      alternates: {
        languages: {
          de: `/kb/${article.slug.replace(/\/index$/, '')}`,
          en: `/en/kb/${article.slug.replace(/\/index$/, '')}`,
          'x-default': `/kb/${article.slug.replace(/\/index$/, '')}`
        }
      }
    }))
  ]
}
