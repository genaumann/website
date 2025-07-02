import type {TolgeePlugin, BackendMiddleware} from '@tolgee/core'
import {fetchI18n} from './fetch'

type LoaderFn = (params: {
  namespace?: string
  language: string
}) => Promise<Record<string, string> | undefined> | Record<string, string>

interface BackendOptions {
  loader: LoaderFn
}

export function CreateFunctionBackend({loader}: BackendOptions): TolgeePlugin {
  return (tolgee, tools) => {
    const backend: BackendMiddleware = {
      async getRecord({namespace, language}) {
        try {
          const data = await loader({namespace, language})
          if (!data || typeof data !== 'object') {
            throw new Error('Loader function did not return a valid object')
          }
          return data
        } catch (error) {
          console.error('Error in Tolgee backend loader:', error)
          throw error
        }
      }
    }
    tools.addBackend(backend)
    return tolgee
  }
}

type FetchTolgeeParams = {
  namespace?: string
  language: string
}

export const fetchTolgee = async ({
  namespace,
  language
}: FetchTolgeeParams): Promise<Record<string, string>> => {
  const cdnData = await fetchI18n({
    namespace,
    language,
    isCdn: true
  })

  if (!cdnData) {
    return (
      (await fetchI18n({
        namespace,
        language,
        isCdn: false
      })) || {}
    )
  }

  return cdnData
}
