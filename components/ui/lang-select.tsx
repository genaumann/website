'use client'

import {useLocale} from 'next-intl'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './select'
import {LOCALES} from '@/locales'
import {useCallback, useTransition} from 'react'
import {usePathname, useRouter} from '@/locales/routing'
import {useParams} from 'next/navigation'
import {setUserLocale} from '@/lib/cookie'

interface LocaleMap {
  [key: string]: {
    icon: string
    name: string
  }
}

export default function LangSelect() {
  const locale = useLocale()
  const [, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const localeMap: LocaleMap = {
    de: {
      icon: '🇩🇪',
      name: 'Deutsch'
    },
    en: {
      icon: '🇬🇧',
      name: 'English'
    }
  }

  const changeLocale = useCallback(
    async (nextLocale: LOCALES) => {
      await setUserLocale(nextLocale)
      await new Promise(resolve => setTimeout(resolve, 100))
      startTransition(() => {
        router.replace(
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          {pathname, params},
          {locale: nextLocale}
        )
      })
    },
    [pathname, params, router]
  )

  return (
    <Select defaultValue={locale} onValueChange={changeLocale}>
      <SelectTrigger className="min-w-[109px] bg-secondary hover:bg-inherit">
        <SelectValue
          placeholder={
            <>
              <span className="me-2">{localeMap[locale].icon}</span>
              <span className="me-1">{localeMap[locale].name}</span>
            </>
          }
        />
      </SelectTrigger>
      <SelectContent className="border-muted">
        {Object.entries(localeMap).map(([key, value]) => (
          <SelectItem key={key} value={key}>
            <span className="me-2">{value.icon}</span>
            <span className="me-1">{value.name}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
