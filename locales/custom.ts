import {get} from 'lodash'
import appMessagesDe from '@/locales/de_DE.json'
import appMessagesEn from '@/locales/en_US.json'
import {LOCALE_KEY, LOCALES} from '.'

type MessagesMap = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in LOCALE_KEY]: Record<string, any>
}

const messagesMap: MessagesMap = {
  de: appMessagesDe,
  en: appMessagesEn
}

export default async function getTranslationByLocale(
  loc?: string | null | LOCALE_KEY
) {
  const locale = Object.keys(LOCALES).includes(loc as LOCALE_KEY)
    ? (loc as LOCALE_KEY)
    : ('de' as LOCALE_KEY)

  const messages = messagesMap[locale]
  return (key: string, values?: Record<string, string>) => {
    const translation = get(messages, key)
    if (!translation) {
      return key
    }

    if (values) {
      return Object.keys(values).reduce((acc, k) => {
        return acc.replace(`{${k}}`, values[k])
      }, translation)
    }
    return translation
  }
}
