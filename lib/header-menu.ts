import LangSelect from '@/components/ui/lang-select'
import ThemeSwitch from '@/components/ui/theme-switch'
import {useTranslations} from 'next-intl'

export interface HeaderItem {
  name: string
  href?: string
}

interface HeaderLogo {
  name: string
  href: string
  imageUrl: string
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
    imageUrl: '/logo.png'
  },
  items: [
    {
      name: t('portfolio.title'),
      href: '/portfolio'
    },
    {
      name: t('common.knowledgebase'),
      href: '/kb'
    }
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
