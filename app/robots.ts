import {MetadataRoute} from 'next'

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/privacy', '/imprint']
    }
  }
}

export default robots
