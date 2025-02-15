import {IconName} from '@awesome.me/kit-b84c272999/icons'
import {useTranslations} from 'next-intl'

interface HeaderItemElement extends HeaderItem {
  icon: IconName
}

export interface HeaderItem {
  name: string
  href?: string
  lightImageUrl?: string
  darkImageUrl?: string
  imageLink?: string
  headline?: string
  elements?: HeaderItemElement[]
}

interface HeaderLogo {
  name: string
  href: string
  darkImageUrl: string
  lightImageUrl: string
}

interface HeaderSocial {
  name: string
  href: string
  icon: IconName
}

export interface HeaderMenu {
  logo: HeaderLogo
  items: HeaderItem[]
  socials: HeaderSocial[]
}

export const getHeaderMenu = (
  t: ReturnType<typeof useTranslations>
): HeaderMenu => ({
  logo: {
    name: 'GNaumann',
    href: '/',
    darkImageUrl: '/gnaumann_white.png',
    lightImageUrl: '/gnaumann_col.png'
  },
  items: [
    {
      name: t('common.aboutMe'),
      lightImageUrl: '/me-white.png',
      darkImageUrl: '/me-black.png',
      imageLink: '/#about',
      headline: 'Gino Naumann',
      elements: [
        {
          name: t('common.certificates'),
          href: '/#cert',
          icon: 'file-certificate'
        },
        {
          name: t('common.workExperience'),
          href: '/#experience',
          icon: 'suitcase'
        }
      ]
    },
    {
      name: t('common.knowledgebase'),
      href: '/kb'
    }
  ],
  socials: [
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
})
