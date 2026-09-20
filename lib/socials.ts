import {IconType} from 'react-icons'
import {FaLinkedin} from 'react-icons/fa6'
import {SiGithub} from 'react-icons/si'

interface SocialItem {
  name: string
  href: string
  icon: IconType
}

export const getSocials = (): SocialItem[] => [
  {
    name: 'LinkedIn',
    href: 'https://de.linkedin.com/in/gino-naumann-356993240',
    icon: FaLinkedin
  },
  {
    name: 'GitHub',
    href: 'https://github.com/genaumann',
    icon: SiGithub
  }
]
