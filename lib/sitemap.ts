'use server'

import {getFlatArticleIndex} from '@/lib/mdx'
import {MetadataRoute} from 'next'
import {tools as getAllTools} from '@/lib/tools'
import {LOCALES} from '@/locales'
import {getProjects} from './projects'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getFlatArticleIndex(LOCALES.de)
  const allTools = getAllTools()
  const projects = getProjects()

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
      url: `/portfolio/technologies`,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          de: `/portfolio/technologies`,
          en: `/en/portfolio/technologies`,
          'x-default': `/portfolio/technologies`
        }
      }
    },
    {
      url: `/portfolio/projects`,
      changeFrequency: 'monthly',
      priority: 0.4,
      alternates: {
        languages: {
          de: `/portfolio/projects`,
          en: `/en/portfolio/projects`,
          'x-default': `/portfolio/projects`
        }
      }
    },
    {
      url: `/downloads`,
      changeFrequency: 'monthly',
      priority: 0.3,
      alternates: {
        languages: {
          de: `/downloads`,
          en: `/en/downloads`,
          'x-default': `/downloads`
        }
      }
    },
    ...allTools.map(tool => ({
      url: `/portfolio/technologies/${tool.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
      alternates: {
        languages: {
          de: `/portfolio/technologies/${tool.slug}`,
          en: `/en/portfolio/technologies/${tool.slug}`,
          'x-default': `/portfolio/technologies/${tool.slug}`
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
    })),
    ...projects.map(project => ({
      url: `/portfolio/projects/${project.id}`,
      changeFrequency: 'yearly' as const,
      priority: 0.4,
      alternates: {
        languages: {
          de: `/portfolio/projects/${project.id}`,
          en: `/en/portfolio/projects/${project.id}`,
          'x-default': `/portfolio/projects/${project.id}`
        }
      }
    }))
  ]
}
