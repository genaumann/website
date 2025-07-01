'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './select'
import {LOCALES} from '@/locales'
import {useTransition} from 'react'
import {usePathname, useRouter} from '@/locales/routing'
import {useParams} from 'next/navigation'
import {setUserLocale} from '@/lib/cookie'
import {useTranslate} from '@tolgee/react'
import {NextIntlClientProvider} from 'next-intl'

interface LocaleMap {
  [key: string]: {
    icon: string
    name: string
  }
}

export type LangSelectProps = {
  locale: LOCALES
}

function SelectComponent({locale}: LangSelectProps) {
  const [, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const {t} = useTranslate()

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

  const changeLocale = async (nextLocale: LOCALES) => {
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
  }

  return (
    <Select defaultValue={locale} onValueChange={changeLocale}>
      <SelectTrigger
        className="min-w-[109px] bg-secondary/40"
        aria-label={t('selectLanguage')}>
        <SelectValue
          placeholder={
            <>
              <span className="me-2">{localeMap[locale].icon}</span>
              <span className="me-1">{localeMap[locale].name}</span>
            </>
          }
        />
      </SelectTrigger>
      <SelectContent>
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

export default function LangSelect({locale}: LangSelectProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={null}>
      <SelectComponent locale={locale} />
    </NextIntlClientProvider>
  )
}
