import {localeKeys, namespaces} from '@/tolgee'
import fs from 'fs/promises'
import path from 'path'

export const fetchTolgee = async () => {
  const cdn = process.env.TOLGEE_CDN_URL

  if (!cdn) {
    throw new Error('TOLGEE_CDN_URL is not defined')
  }

  for (const locale of localeKeys) {
    for (const ns of namespaces) {
      const localeDir = path.join(process.cwd(), 'public', 'i18n', ns)
      await fs.mkdir(localeDir, {recursive: true})
      const response = await fetch(`${cdn}/${ns}/${locale}.json`)
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${ns} for ${locale}: ${response.statusText}`
        )
      }
      const data = await response.json()
      const filePath = path.join(localeDir, `${locale}.json`)
      await fs.writeFile(filePath, JSON.stringify(data, null, 2))
      console.log(`✓ [${locale}:${ns}]: Fetched and saved translations`)
    }
  }
}
