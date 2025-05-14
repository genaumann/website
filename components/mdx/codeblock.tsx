'use client'

import {Fragment, type ReactNode, useState} from 'react'
import {cn} from '@/lib/cn'
import {Button} from '../ui/button'
import Icon from '../ui/icon'
import {getIconByFileType} from '@/lib/iconmap'
import '@/styles/highlight.css'
import {usePathname, useRouter} from '@/locales/routing'
import {useSearchParams} from 'next/navigation'
import {createQueryString} from '@/lib/url'

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
  const id = `${title}-${language}-${line}`
  const queryString = `${id}-l`
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [selectedLine, setSelectedLine] = useState<string | null>(
    searchParams.get(queryString)
  )

  const showLineNumbers = showLine === 'true'

  const copyToClipboard = async () => {
    try {
      const textToCopy =
        document.querySelector(`#${id} > pre > code`)?.textContent || ''

      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleLineClick = (lineNumber: string) => () => {
    if (selectedLine === lineNumber) {
      setSelectedLine(null)
      const params = createQueryString(searchParams, `${id}-l`, '')
      router.push(`${pathname}?${params}`, {scroll: false})
      return
    }
    const params = createQueryString(searchParams, `${id}-l`, lineNumber)
    router.push(`${pathname}?${params}`, {scroll: false})
    setSelectedLine(lineNumber)
  }

  const iconName = getIconByFileType(language)

  const lineNumbers = Array.from({length: line}, (_, i) => String(i + 1))

  return (
    <div className="my-6 w-full overflow-hidden rounded-md bg-background shadow-md shadow-secondary/40">
      {title && (
        <div className="flex items-center justify-between bg-card px-4 py-2">
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
          <Button
            onClick={copyToClipboard}
            variant="ghost"
            className="cursor-pointer group hover:bg-inherit">
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
                className="h-4 w-4 transition-transform duration-200 group-hover:scale-125"
                width={16}
                height={16}
              />
            )}
          </Button>
        </div>
      )}
      <div className="overflow-x-auto">
        <div className="flex w-full relative">
          {showLineNumbers && (
            <div className="relative select-none border-r border-muted bg-muted/30 py-4 px-4 font-mono text-xs text-muted-foreground flex flex-col items-start">
              {lineNumbers.map(num => (
                <span
                  key={num}
                  onClick={handleLineClick(num)}
                  className={cn(
                    'leading-[24px] -translate-y-[4px] not-prose hover:underline cursor-pointer',
                    selectedLine === num
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}>
                  {num}
                </span>
              ))}
            </div>
          )}
          <div
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
