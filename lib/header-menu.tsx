'use server'

import LangSelect from '@/components/ui/lang-select'
import ThemeSwitch from '@/components/ui/theme-switch'
import {getTranslate} from './integrations/tolgee/server'
import {LocaleParam} from './types'

export interface HeaderItem {
  name: string
  href?: string
}

interface HeaderLogo {
  name: string
  href: string
  imageUrl: string
}

interface HeaderTool {
  name: string
  Component: React.JSX.Element
}

export interface HeaderMenu {
  logo: HeaderLogo
  items: HeaderItem[]
  tools: HeaderTool[]
}

export const getHeaderMenu = async ({
  locale
}: LocaleParam): Promise<HeaderMenu> => {
  const t = await getTranslate()
  return {
    logo: {
      name: 'GNaumann',
      href: '/',
      imageUrl: '/logo.png'
    },
    items: [
      {
        name: t('portfolio'),
        href: '/portfolio'
      },
      {
        name: t('projects'),
        href: '/portfolio/projects'
      },
      {
        name: t('kb'),
        href: '/kb'
      }
    ],
    tools: [
      {
        name: t('language'),
        Component: <LangSelect key="lang" locale={locale} />
      },
      {
        name: t('theme'),
        Component: <ThemeSwitch key="theme" />
      }
    ]
  }
}
