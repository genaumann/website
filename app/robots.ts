import {origin} from '@/lib/url'
import {MetadataRoute} from 'next'

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/privacy', '/imprint']
    },
    sitemap: `${origin}/sitemap.xml`
  }
}

export default robots
