import {IconName} from '@/components/ui/icon'

interface SocialItem {
  name: string
  href: string
  icon: IconName
}

export const getSocials = (): SocialItem[] => [
  {
    name: 'LinkedIn',
    href: 'https://de.linkedin.com/in/gino-naumann-356993240',
    icon: 'linkedin'
  },
  {
    name: 'GitHub',
    href: 'https://github.com/genaumann',
    icon: 'github'
  }
]
