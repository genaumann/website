import {DevTools, Tolgee, FormatSimple, BackendFetch} from '@tolgee/web'
import {FormatIcu} from '@tolgee/format-icu'
import {origin} from '@/lib/url'

const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY
const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL

export function TolgeeBase() {
  return Tolgee()
    .use(
      BackendFetch({
        prefix: 'api/i18n',
        getPath: ({language, prefix, namespace}) =>
          `${origin}/${prefix}/${namespace}/${language}`
      })
    )
    .use(FormatSimple())
    .use(FormatIcu())
    .use(DevTools())
    .updateDefaults({
      apiKey,
      apiUrl
    })
}
