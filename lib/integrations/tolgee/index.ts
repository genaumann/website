import {DevTools, Tolgee, FormatSimple} from '@tolgee/web'
import {FormatIcu} from '@tolgee/format-icu'
import {CreateFunctionBackend, fetchTolgee} from './plugin'
import {LOCALES} from '@/locales'

const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY
const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL

export function TolgeeBase() {
  return Tolgee()
    .use(FormatSimple())
    .use(FormatIcu())
    .use(DevTools())
    .use(CreateFunctionBackend({loader: fetchTolgee}))
    .updateDefaults({
      apiKey,
      apiUrl,
      onTranslationMissing: info => {
        if (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
          import(
            `../../../public/i18n/${info.ns || 'common'}/${info.language || LOCALES.de}.json`
          )
            .then(data => {
              if (!data || !data[info.key]) {
                console.error(
                  `Translation missing for ${info.ns}.${info.key} in ${info.language || LOCALES.de}`
                )
              }
            })
            .catch(err => {
              console.error(
                `Error loading translation for ${info.ns}.${info.key} in ${info.language || LOCALES.de}`,
                err
              )
            })
        }
        return `${info.ns}.${info.key}`
      }
    })
}
