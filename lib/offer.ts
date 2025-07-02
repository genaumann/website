'use server'

import {IconName, IconPrefix} from '@/components/ui/icon'
import {getTranslate} from './integrations/tolgee/server'

type Offer = {
  id: string
  name: string
  iconName: IconName
  iconPrefix?: IconPrefix
  description: string
  technologies: string[]
}

type OfferProps = {
  technologies?: string[]
}

// TODO Cache
export const getOffers = async ({technologies}: OfferProps = {}) => {
  const t = await getTranslate('portfolio')
  const offer: Offer[] = [
    {
      id: 'iac-server',
      name: t('offer.iacServer.title'),
      iconName: 'server',
      description: t('offer.iacServer.description'),
      technologies: ['salt', 'ansible']
    },
    {
      id: 'cicd',
      name: t('offer.cicd.title'),
      iconName: 'rocket-launch',
      description: t('offer.cicd.description'),
      technologies: ['gitlab', 'github']
    },
    {
      id: 'e2e',
      name: t('offer.e2e.title'),
      iconName: 'flask-vial',
      description: t('offer.e2e.description'),
      technologies: ['playwright']
    },
    {
      id: 'nextjs-dev',
      name: t('offer.nextjsDev.title'),
      iconName: 'code',
      description: t('offer.nextjsDev.description'),
      technologies: ['nextjs', 'react']
    },
    {
      id: 'cloud',
      name: t('offer.cloud.title'),
      iconName: 'cloud',
      description: t('offer.cloud.description'),
      technologies: ['aws', 'azure']
    },
    {
      id: 'kubernetes',
      name: t('offer.kubernetes.title'),
      iconName: 'cubes',
      description: t('offer.kubernetes.description'),
      technologies: ['kubernetes', 'docker']
    }
  ]

  return offer.filter(item =>
    technologies
      ? item.technologies.some(tech => technologies.includes(tech))
      : true
  )
}
