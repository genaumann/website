'use client'

import {type ReactNode, useState} from 'react'
import {cn} from '@/lib/cn'
import {Button} from '../ui/button'
import Icon from '../ui/icon'
import {getIconByFileType} from '@/lib/iconmap'

export interface CodeBlockFileProps {
  children?: ReactNode
  title?: string
  line?: number
  showLine?: string
  language?: string
}

export default function CodeBlock({
  children,
  title,
  line = 1,
  showLine = 'true',
  language = 'tsx'
}: CodeBlockFileProps) {
  const [copied, setCopied] = useState(false)
  const showLineNumbers = showLine === 'true'

  const id = `${title}-${language}-${line}`

  const copyToClipboard = async () => {
    try {
      // If children contains HTML elements, we need to extract the text
      const textToCopy =
        typeof children === 'string'
          ? children
          : document.querySelector(`#${id} > pre > code`)?.textContent || ''

      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const iconName = getIconByFileType(language)

  const lineNumbers = Array.from({length: line}, (_, i) =>
    String(i + 1).padStart(2, '0')
  )

  return (
    <div className="my-6 w-full overflow-hidden rounded-md bg-background shadow-md">
      {title && (
        <div className="flex items-center justify-between bg-secondary/40 px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="space-x-1">
            <Icon name={iconName} className="h-2 w-2" size="sm" />
            <span className="font-mono text-sm text-muted-foreground">
              {title}
            </span>
          </div>
          <Button onClick={copyToClipboard} variant="ghost">
            {copied ? (
              <Icon
                name="clipboard-check"
                className="h-4 w-4 text-primary"
                width={16}
                height={16}
              />
            ) : (
              <Icon
                name="clipboard"
                className="h-4 w-4"
                width={16}
                height={16}
              />
            )}
          </Button>
        </div>
      )}
      <div className="relative overflow-x-auto">
        <div className="flex w-full">
          {showLineNumbers && (
            <div className="select-none border-r border-muted bg-muted/30 py-4 px-4 font-mono text-xs text-muted-foreground flex flex-col items-start">
              {lineNumbers.map(num => (
                <div key={num} className="leading-[24px] -translate-y-[4px]">
                  {num}
                </div>
              ))}
            </div>
          )}
          <div
            id={id}
            className={cn(
              'w-full overflow-x-auto prose',
              showLineNumbers ? 'pl-0' : 'pl-4'
            )}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
