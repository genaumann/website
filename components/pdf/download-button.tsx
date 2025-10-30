'use client'

import {Button, ButtonProps} from '@/components/ui/button'
import {useTolgee} from '@tolgee/react'
import {LOCALES} from '@/locales'
import {PDFFileId} from '@/components/pdf/files'
import Icon from '../ui/icon'
import {useCallback, useState} from 'react'

export default function DownloadPDFButton({
  file,
  label = 'Download PDF',
  ...props
}: {
  file: PDFFileId
  label?: string
} & ButtonProps) {
  const tolgee = useTolgee()
  const locale = tolgee.getLanguage() || LOCALES.de
  const href = `/api/pdf?file=${file}&locale=${locale}`
  const [isLoading, setIsLoading] = useState(false)

  const getFilenameFromHeader = (
    disposition: string | null,
    fallback: string
  ) => {
    if (!disposition) return fallback
    const match = disposition.match(
      /filename\*=UTF-8''([^;\n]+)|filename="?([^";\n]+)"?/i
    )
    const encoded = match?.[1]
    const simple = match?.[2]
    try {
      if (encoded) return decodeURIComponent(encoded)
    } catch (_) {
      // ignore decoding errors and fallback to simple
    }
    return simple || fallback
  }

  const onClick = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(href, {cache: 'no-store'})
      if (!response.ok) throw new Error('Download fehlgeschlagen')

      const contentDisposition = response.headers.get('Content-Disposition')
      const defaultName = `ginonaumann-${file}-${locale}.pdf`
      const filename = getFilenameFromHeader(contentDisposition, defaultName)

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } finally {
      setIsLoading(false)
    }
  }, [href, file, locale])

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      aria-busy={isLoading}
      {...props}>
      {isLoading ? (
        <Icon name="loader" className="animate-spin" />
      ) : (
        <Icon name="download" />
      )}
      {label}
    </Button>
  )
}
