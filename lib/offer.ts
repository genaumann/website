import {IconName, IconPrefix} from '@/components/ui/icon'
import {useTranslations} from 'next-intl'

type Offer = {
  id: string
  name: string
  iconName: IconName
  iconPrefix?: IconPrefix
  description: string
  technologies: string[]
}

type OfferProps = {
  t: ReturnType<typeof useTranslations>
  technologies?: string[]
}

// const t = useTranslations('portfolio.offers')

export const getOffers = ({t, technologies}: OfferProps) => {
  // TODO: Check descriptions
  const offer: Offer[] = [
    {
      id: 'iac-server',
      name: t('iacServer.title'),
      iconName: 'server',
      description: t('iacServer.description'),
      technologies: ['salt', 'ansible']
    },
    {
      id: 'cicd',
      name: t('cicd.title'),
      iconName: 'rocket-launch',
      description: t('cicd.description'),
      technologies: ['gitlab', 'github']
    },
    {
      id: 'e2e',
      name: t('e2e.title'),
      iconName: 'flask-vial',
      description: t('e2e.description'),
      technologies: ['playwright']
    },
    {
      id: 'nextjs-dev',
      name: t('nextjsDev.title'),
      iconName: 'code',
      description: t('nextjsDev.description'),
      technologies: ['nextjs', 'react']
    },
    {
      id: 'cloud',
      name: t('cloud.title'),
      iconName: 'cloud',
      description: t('cloud.description'),
      technologies: ['aws', 'azure']
    },
    {
      id: 'kubernetes',
      name: t('kubernetes.title'),
      iconName: 'cubes',
      description: t('kubernetes.description'),
      technologies: ['kubernetes', 'docker']
    }
  ]

  return offer.filter(item =>
    technologies
      ? item.technologies.some(tech => technologies.includes(tech))
      : true
  )
}
