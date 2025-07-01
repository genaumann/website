import type {TolgeePlugin, BackendMiddleware} from '@tolgee/core'

type LoaderFn = (params: {
  namespace?: string
  language: string
}) => Promise<Record<string, string>> | Record<string, string>

export function createFunctionBackend(loader: LoaderFn): TolgeePlugin {
  return (tolgee, tools) => {
    const backend: BackendMiddleware = {
      async getRecord({namespace, language}) {
        const data = await loader({namespace, language})
        if (!data || typeof data !== 'object') {
          throw new Error('Loader function did not return a valid object')
        }
        return data
      }
    }
    tools.addBackend(backend)
    return tolgee
  }
}
