import type React from 'react'
import {getIconByFileType} from '@/lib/iconmap'
import {TerminalIcon, MessageSquareIcon} from 'lucide-react'
import {
  MacOSWindow,
  MacOSWindowContent,
  MacOSWindowHeader,
  MacOSWindowHeaderButtons,
  MacOSWindowTitle,
  MacOSWindowTitleIcon,
  MacOSWindowTitleText
} from '@/components/ui/macos-window'
import {
  CodeBlockFile,
  CodeBlockFileBody,
  CodeBlockFileContent,
  CodeBlockFileCopy,
  CodeBlockFileLineNumbers,
  CodeBlockFileParts,
  CodeBlockFileTab,
  CodeBlockFileTabWrapper
} from '@/components/ui/codeblock-file'
import CodeBlockCopyButton from '../ui/copy-button'
import {sanitizeString} from '@/lib/string'

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
  id: origID,
  variant,
  title: titleProp,
  line,
  code,
  language,
  filePath
}: CodeBlockProps) {
  const title = titleProp || filePath?.split('/').at(-1)
  const icon: React.ReactNode =
    variant === 'file'
      ? getIconByFileType(language || 'default')
      : variant === 'terminal'
        ? <TerminalIcon className="size-4" />
        : <MessageSquareIcon className="size-4" />

  const id = sanitizeString(origID)

  return (
    <>
      {variant === 'file' || variant === 'terminal' ? (
        <MacOSWindow>
          <MacOSWindowHeader>
            <MacOSWindowHeaderButtons />
            <MacOSWindowTitle>
              <MacOSWindowTitleIcon>{icon}</MacOSWindowTitleIcon>
              <MacOSWindowTitleText>{title}</MacOSWindowTitleText>
            </MacOSWindowTitle>
          </MacOSWindowHeader>
          <MacOSWindowContent>
            {variant === 'file' ? (
              <CodeBlockFile>
                <CodeBlockFileTabWrapper>
                  <CodeBlockFileTab fileName={title || ''} icon={icon} />
                  <CodeBlockFileCopy id={id} />
                </CodeBlockFileTabWrapper>
                <CodeBlockFileParts
                  filePathParts={filePath?.split('/') || []}
                  fileIcon={icon}
                />
                <CodeBlockFileBody>
                  <CodeBlockFileLineNumbers line={line || 1} />
                  <CodeBlockFileContent
                    id={id}
                    dangerouslySetInnerHTML={{__html: code}}
                  />
                </CodeBlockFileBody>
              </CodeBlockFile>
            ) : (
              <div className="relative">
                <div
                  className="w-full overflow-x-auto prose codeblock-terminal"
                  id={id}
                  dangerouslySetInnerHTML={{__html: code}}
                />
                <div className="absolute -top-[34px] right-0">
                  <CodeBlockCopyButton id={id} />
                </div>
              </div>
            )}
          </MacOSWindowContent>
        </MacOSWindow>
      ) : variant === 'output' ? (
        <div
          className="codeblock-output w-full overflow-x-auto prose bg-background border border-border -mt-1  rounded-b-md mb-5 shadow-md"
          dangerouslySetInnerHTML={{__html: code}}
        />
      ) : (
        <div
          className="w-full overflow-x-auto prose bg-background border border-border rounded-md"
          dangerouslySetInnerHTML={{__html: code}}
        />
      )}
    </>
  )
}
