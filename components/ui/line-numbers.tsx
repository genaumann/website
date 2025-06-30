'use client'

import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {createQueryString} from '@/lib/url'
import {useState} from 'react'
import {cn} from '@/lib/cn'

export default function CodeBlockLineNumbers({
  line,
  id
}: {
  line: number
  id?: string
}) {
  const queryString = `${id}-l`
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [selectedLine, setSelectedLine] = useState<string | null>(
    searchParams.get(queryString)
  )

  const lineNumbers = Array.from({length: line}, (_, i) => String(i + 1))
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
  return (
    <>
      {lineNumbers.map(num => (
        <span
          key={num}
          onClick={id ? handleLineClick(num) : undefined}
          className={cn(
            'leading-[24px] -translate-y-[4px] not-prose',
            selectedLine === num ? 'text-primary' : 'text-muted-foreground',
            id && 'hover:underline cursor-pointer'
          )}>
          {num}
        </span>
      ))}
    </>
  )
}
