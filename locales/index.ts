import {getRequestConfig} from 'next-intl/server'
export {getLocale} from 'next-intl/server'
export {useLocale} from 'next-intl'

export enum LOCALES {
  de = 'de',
  en = 'en'
}

export type LOCALE_KEY = keyof typeof LOCALES

export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale

  return {
    locale: locale || LOCALES.de,
    messages: {}
  }
})
