import {LOCALES} from '@/locales'
import {format as _format} from 'date-fns'
import {de, enUS} from 'date-fns/locale'

process.env.TZ = 'Europe/Berlin'

const localeMap = {
  [LOCALES.de]: de,
  [LOCALES.en]: enUS
}

export const getDateFunctions = (key: LOCALES) => {
  const locale = localeMap[key] || localeMap[LOCALES.de]
  const format = (date: Date | string | number, pattern: string) =>
    _format(new Date(date), pattern, {locale})

  return {
    format
  }
}
