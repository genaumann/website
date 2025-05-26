import {getIconByFileType} from '@/lib/iconmap'
import {IconName} from '@/components/ui/icon'
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
        <MacOSWindow>
          <MacOSWindowHeader>
            <MacOSWindowHeaderButtons />
            <MacOSWindowTitle>
              <MacOSWindowTitleIcon name={iconName} />
              <MacOSWindowTitleText>{title}</MacOSWindowTitleText>
            </MacOSWindowTitle>
          </MacOSWindowHeader>
          <MacOSWindowContent>
            {variant === 'file' ? (
              // <CodeBlockFile
              //   id={id}
              //   code={code}
              //   filePath={filePath}
              //   fileName={title}
              //   fileIcon={iconName}
              //   line={line}
              // />
              <CodeBlockFile>
                <CodeBlockFileTabWrapper>
                  <CodeBlockFileTab fileName={title || ''} icon={iconName} />
                  <CodeBlockFileCopy id={id} />
                </CodeBlockFileTabWrapper>
                <CodeBlockFileParts
                  filePathParts={filePath?.split('/') || []}
                  fileIcon={iconName}
                />
                <CodeBlockFileBody>
                  <CodeBlockFileLineNumbers line={line || 1} />
                  <CodeBlockFileContent
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
