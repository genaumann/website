import {getKBPath} from '@/lib/mdx'
import {findArticleBySlug} from '@/lib/mdx-edge'
import {LOCALES} from '@/locales'
import {getLocale} from 'next-intl/server'
import CodeBlock, {CodeBlockProps} from './codeblock'
import {codeToHtml} from 'shiki'
import {getShikiConfig} from '@/lib/shiki'

type Props = Omit<CodeBlockProps, 'variant' | 'filePath'> & {
  remoteRepo?: string
  filePath?: string
  branch?: string
}

export default async function ExternalCodeBlock({
  language,
  title,
  id,
  remoteRepo,
  filePath,
  branch = 'main'
}: Props) {
  const path = await getKBPath()
  const locale = (await getLocale()) as LOCALES
  const article = await findArticleBySlug(locale, path)

  const repo = remoteRepo || article?.remoteRepo

  if (!repo || !filePath) {
    console.error(
      'ExternalCodeBlock: No remote repository or file path provided.'
    )
    return null
  }

  const fileUrl = new URL(
    `https://raw.githubusercontent.com/${repo}/refs/heads/${branch}/${filePath}`
  )
  const response = await fetch(fileUrl, {next: {revalidate: 43200}})

  if (!response.ok) {
    console.error(
      `ExternalCodeBlock: Failed to fetch file from ${fileUrl}. Status: ${response.status}`
    )
    return null
  }

  const codeLang = language || filePath.split('.').pop() || 'plaintext'
  const text = await response.text()
  const code = await codeToHtml(text, getShikiConfig(codeLang))

  return (
    <CodeBlock
      variant="file"
      id={id || filePath}
      code={code}
      line={text.split('\n').length}
      language={codeLang}
      title={title}
      filePath={filePath}
    />
  )
}
