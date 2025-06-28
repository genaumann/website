import {getLocale} from 'next-intl/server'
import {
  CombinedOptions,
  createServerInstance,
  DefaultParamType,
  TranslationKey
} from '@tolgee/react/server'
import {TolgeeBase} from '.'

export const {getTolgee, T} = createServerInstance({
  getLocale: getLocale,
  createTolgee: async language => {
    return TolgeeBase().init({
      observerOptions: {
        fullKeyEncode: true
      },
      defaultNs: 'common',
      language
    })
  }
})

export const getTranslate = async (ns?: string) => {
  const tolgee = await getTolgee()
  if (ns) {
    await tolgee.addActiveNs(ns)
  }
  return ns
    ? (key: TranslationKey, options?: CombinedOptions<DefaultParamType>) =>
        tolgee.t(key, {ns, ...options})
    : (key: TranslationKey, options?: CombinedOptions<DefaultParamType>) =>
        tolgee.t(key, options)
}
