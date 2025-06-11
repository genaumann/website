import {IconName, IconPrefix} from '@/components/ui/icon'

interface SocialItem {
  name: string
  href: string
  icon: IconName
  iconPrefix?: IconPrefix
}

export const getSocials = (): SocialItem[] => [
  {
    name: 'LinkedIn',
    href: 'https://de.linkedin.com/in/gino-naumann-356993240',
    icon: 'linkedin',
    iconPrefix: 'fab'
  },
  {
    name: 'GitHub',
    href: 'https://github.com/genaumann',
    icon: 'github',
    iconPrefix: 'fab'
  }
]
