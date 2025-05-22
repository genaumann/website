import {getIconByFileType} from '@/lib/iconmap'
import CodeBlockFile from './codeblock-file'
import CodeBlockWrapper from './wrapper'
import {IconName} from '@/components/ui/icon'
import CodeBlockTerminal from './codeblock-terminal'

export type CodeBlockVariant = 'file' | 'terminal' | 'output'

export interface CodeBlockProps {
  variant?: CodeBlockVariant
  title?: string
  language?: string
  line?: number
  code: string
  filePath?: string
  id?: string
}

export default function CodeBlock({
  id,
  variant,
  title: titleProp,
  line,
  code,
  language,
  filePath
}: CodeBlockProps) {
  const title = titleProp || filePath?.split('/').at(-1)
  const iconName: IconName =
    variant === 'file'
      ? getIconByFileType(language || 'default')
      : variant === 'terminal'
      ? 'rectangle-terminal'
      : 'message'

  return (
    <>
      {variant === 'file' || variant === 'terminal' ? (
        <CodeBlockWrapper title={title} titleIcon={iconName}>
          {variant === 'file' ? (
            <CodeBlockFile
              id={id}
              code={code}
              filePath={filePath}
              fileName={title}
              fileIcon={iconName}
              line={line}
            />
          ) : (
            <CodeBlockTerminal code={code} id={id} />
          )}
        </CodeBlockWrapper>
      ) : variant === 'output' ? (
        <div
          className="codeblock-output w-full overflow-x-auto prose bg-card rounded-b-md -mt-6 mb-5 shadow-md"
          dangerouslySetInnerHTML={{__html: code}}
        />
      ) : (
        <div
          className="w-full overflow-x-auto prose bg-card rounded-md"
          dangerouslySetInnerHTML={{__html: code}}
        />
      )}
    </>
  )
}
