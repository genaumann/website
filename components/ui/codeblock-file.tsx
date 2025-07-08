import * as React from 'react'
import {cn} from '@/lib/cn'
import Icon, {IconProps} from './icon'
import CodeBlockCopyButton from './copy-button'
import CodeBlockLineNumbers from './line-numbers'

const CodeBlockFile = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div ref={ref} className={cn('overflow-x-auto', className)} {...props} />
))
CodeBlockFile.displayName = 'CodeBlockFile'

const CodeBlockFileTabWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div ref={ref} className={cn('flex', className)} {...props} />
))
CodeBlockFileTabWrapper.displayName = 'CodeBlockFileTabWrapper'

const CodeBlockFileTab = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    icon?: IconProps['name']
    fileName: string
  }
>(({className, icon, fileName, ...props}, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-xs shrink py-2 px-4 border-r border-r-muted border-t border-t-primary w-fit',
      className
    )}
    {...props}>
    {icon && <Icon name={icon} className="mr-1" />}
    <span className="font-mono text-muted-foreground">{fileName}</span>
  </div>
))
CodeBlockFileTab.displayName = 'CodeBlockFileTab'

const CodeBlockFileCopy = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, id, ...props}, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex justify-end grow border-b border-b-muted-foreground/10',
      className
    )}
    {...props}>
    {id && <CodeBlockCopyButton id={id} />}
  </div>
))
CodeBlockFileCopy.displayName = 'CodeBlockFileCopy'

const CodeBlockFileParts = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    filePathParts: string[]
    fileIcon?: IconProps['name']
  }
>(({className, fileIcon, filePathParts, ...props}, ref) => (
  <div
    className={cn(
      'w-full text-xs font-mono py-1 pl-3 border-b border-b-muted-foreground/10',
      className
    )}
    ref={ref}
    {...props}>
    <>
      {filePathParts.map((part, index) => (
        <React.Fragment key={index}>
          {index === filePathParts.length - 1 && fileIcon && (
            <Icon name={fileIcon} className="mr-1" />
          )}
          <span>{part}</span>
          {index < filePathParts.length - 1 && (
            <Icon name="chevron-right" className="mx-1" />
          )}
        </React.Fragment>
      ))}
    </>
  </div>
))
CodeBlockFileParts.displayName = 'CodeBlockFileParts'

const CodeBlockFileBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div className={cn('flex w-full relative', className)} ref={ref} {...props} />
))
CodeBlockFileBody.displayName = 'CodeBlockFileBody'

const CodeBlockFileLineNumbers = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {line: number; id?: string}
>(({className, line, id, ...props}, ref) => (
  <div
    className={cn(
      'relative select-none border-r border-muted-foreground/10 py-4 px-4 font-mono text-xs text-muted-foreground flex flex-col items-start',
      className
    )}
    ref={ref}
    {...props}>
    <CodeBlockLineNumbers line={line} id={id} />
  </div>
))
CodeBlockFileLineNumbers.displayName = 'CodeBlockFileLineNumbers'

const CodeBlockFileContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    className={cn('w-full overflow-x-auto prose', className)}
    ref={ref}
    {...props}
  />
))
CodeBlockFileContent.displayName = 'CodeBlockFileContent'

export {
  CodeBlockFile,
  CodeBlockFileTab,
  CodeBlockFileTabWrapper,
  CodeBlockFileCopy,
  CodeBlockFileParts,
  CodeBlockFileBody,
  CodeBlockFileLineNumbers,
  CodeBlockFileContent
}
