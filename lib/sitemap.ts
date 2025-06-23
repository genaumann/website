'use server'

import {getFlatArticleIndex} from '@/lib/mdx'
import {MetadataRoute} from 'next'
import {tools as getAllTools} from '@/lib/tools'

export default async function sitemap(
  origin: string = ''
): Promise<MetadataRoute.Sitemap> {
  const articles = await getFlatArticleIndex('de')
  const allTools = getAllTools()

  return [
    {
      url: `${origin}/`,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          de: `${origin}/`,
          en: `${origin}/en`,
          'x-default': `${origin}/`
        }
      }
    },
    {
      url: `${origin}/privacy`,
      changeFrequency: 'yearly',
      priority: 0.1,
      alternates: {
        languages: {
          de: `${origin}/privacy`,
          en: `${origin}/en/privacy`,
          'x-default': `${origin}/privacy`
        }
      }
    },
    {
      url: `${origin}/imprint`,
      changeFrequency: 'yearly',
      priority: 0.1,
      alternates: {
        languages: {
          de: `${origin}/imprint`,
          en: `${origin}/en/imprint`,
          'x-default': `${origin}/imprint`
        }
      }
    },
    {
      url: `${origin}/portfolio`,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          de: `${origin}/portfolio`,
          en: `${origin}/en/portfolio`,
          'x-default': `${origin}/portfolio`
        }
      }
    },
    {
      url: `${origin}/contact`,
      changeFrequency: 'yearly',
      priority: 0.4,
      alternates: {
        languages: {
          de: `${origin}/contact`,
          en: `${origin}/en/contact`,
          'x-default': `${origin}/contact`
        }
      }
    },
    {
      url: `${origin}/portfolio/tools`,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          de: `${origin}/portfolio/tools`,
          en: `${origin}/en/portfolio/tools`,
          'x-default': `${origin}/portfolio/tools`
        }
      }
    },
    ...allTools.map(tool => ({
      url: `${origin}/portfolio/tools/${tool.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
      alternates: {
        languages: {
          de: `${origin}/portfolio/tools/${tool.slug}`,
          en: `${origin}/en/portfolio/tools/${tool.slug}`,
          'x-default': `${origin}/portfolio/tools/${tool.slug}`
        }
      }
    })),
    ...articles.map(article => ({
      url: `${origin}/kb/${article.slug.replace(/\/index$/, '')}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      lastModified: article.updatedAt,
      alternates: {
        languages: {
          de: `${origin}/kb/${article.slug.replace(/\/index$/, '')}`,
          en: `${origin}/en/kb/${article.slug.replace(/\/index$/, '')}`,
          'x-default': `${origin}/kb/${article.slug.replace(/\/index$/, '')}`
        }
      }
    }))
  ]
}
