import {DevTools, Tolgee, FormatSimple} from '@tolgee/web'
import {FormatIcu} from '@tolgee/format-icu'
import {createFunctionBackend} from './plugin'
import {fetchTolgee} from './fetch'

const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY
const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL

export function TolgeeBase() {
  return Tolgee()
    .use(FormatSimple())
    .use(FormatIcu())
    .use(DevTools())
    .use(createFunctionBackend(fetchTolgee))
    .updateDefaults({
      apiKey,
      apiUrl
    })
}
