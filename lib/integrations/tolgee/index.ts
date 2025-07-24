import {DevTools, Tolgee, FormatSimple} from '@tolgee/web'
import {FormatIcu} from '@tolgee/format-icu'
import {CreateFunctionBackend, fetchTolgee} from './plugin'

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
        process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' &&
          console.error(
            `Translation missing for ${info.ns}.${info.key} in ${info.language}`
          )
        return `${info.ns}.${info.key}`
      }
    })
}
