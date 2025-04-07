import LangSelect from '@/components/ui/lang-select'
import ThemeSwitch from '@/components/ui/theme-switch'
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

interface HeaderTools {
  name: string
  Component: React.ComponentType
}

export interface HeaderMenu {
  logo: HeaderLogo
  items: HeaderItem[]
  tools: HeaderTools[]
}

export const getHeaderMenu = (
  t: ReturnType<typeof useTranslations>
): HeaderMenu => ({
  logo: {
    name: 'GNaumann',
    href: '/',
    darkImageUrl: '/logo.png',
    lightImageUrl: '/logo.png'
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
    }
    // {
    //   name: t('common.knowledgebase'),
    //   href: '/kb'
    // }
  ],
  tools: [
    {
      name: t('common.language'),
      Component: LangSelect
    },
    {
      name: t('common.theme'),
      Component: ThemeSwitch
    }
  ]
})
