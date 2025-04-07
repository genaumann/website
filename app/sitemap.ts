import {getFlatArticleIndex} from '@/lib/mdx'
import {MetadataRoute} from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin =
    process.env.VERCEL_ENV === 'production'
      ? 'https://gnaumann.de'
      : process.env.VERCEL_ENV === 'preview'
      ? `https://${process.env.VERCEL_BRANCH_URL}`
      : 'http://localhost:3000'

  const articles = await getFlatArticleIndex('de')

  return [
    {
      url: `${origin}/`,
      changeFrequency: 'monthly',
      priority: 0.5,
      lastModified: new Date(),
      alternates: {
        languages: {
          de: `${origin}/`,
          en: `${origin}/en`
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
          en: `${origin}/en/privacy`
        }
      }
    },
    ...articles.map(article => ({
      url: `${origin}/kb/${article.slug.replace(/\/index$/, '')}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      lastModified: article.updatedAt,
      alternates: {
        languages: {
          de: `${origin}/kb/${article.slug.replace(/\/index$/, '')}`,
          en: `${origin}/en/kb/${article.slug.replace(/\/index$/, '')}`
        }
      }
    }))
  ]
}
