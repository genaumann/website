import CodeBlockLineNumbers from './line-numbers'
import Icon, {IconName} from '@/components/ui/icon'
import {Fragment} from 'react'
import CodeBlockCopyButton from './copy-button'

export interface CodeBlockFileProps {
  id?: string
  code: string
  line?: number
  filePath?: string
  fileName?: string
  fileIcon?: IconName
}

export default function CodeBlockFile({
  id,
  code,
  line = 1,
  filePath,
  fileName,
  fileIcon
}: CodeBlockFileProps) {
  const filePathParts = filePath?.replace(/^\//, '').split('/') || []

  return (
    <div className="overflow-x-auto">
      {filePathParts.length > 0 && fileName && (
        <>
          <div className="flex">
            <div className="shrink py-2 px-4 border-r border-r-muted border-t border-t-primary w-fit text-sm">
              {fileIcon && <Icon name={fileIcon} className="mr-1" />}
              <span className="font-mono text-muted-foreground">
                {fileName}
              </span>
            </div>
            <div className="flex justify-end grow border-b border-b-muted-foreground/10 bg-muted/30">
              <CodeBlockCopyButton id={id} />
            </div>
          </div>
          <div className="w-full text-xs font-mono py-1 pl-4 border-b border-b-muted-foreground/10">
            {filePathParts.map((part, index) => (
              <Fragment key={index}>
                {index === filePathParts.length - 1 && fileIcon && (
                  <Icon name={fileIcon} className="mr-1" />
                )}
                <span>{part}</span>
                {index < filePathParts.length - 1 && (
                  <Icon name="chevron-right" className="mx-1" />
                )}
              </Fragment>
            ))}
          </div>
        </>
      )}
      <div className="flex w-full relative">
        <CodeBlockLineNumbers line={line} id={id} />
        <div
          className="w-full overflow-x-auto prose"
          id={id}
          dangerouslySetInnerHTML={{__html: code}}
        />
      </div>
    </div>
  )
}
