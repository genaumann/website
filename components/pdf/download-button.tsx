'use client'

import {Button, ButtonProps} from '@/components/ui/button'
import {useTolgee} from '@tolgee/react'
import {LOCALES} from '@/locales'
import Icon from '../ui/icon'
import {useCallback, useState} from 'react'
import {DownloadPDFButtonProps} from './files'

export default function DownloadPDFButton(
  props: DownloadPDFButtonProps & ButtonProps
) {
  const {file, label = 'Download PDF', ...buttonProps} = props
  const projectId = 'projectid' in props ? props.projectid : undefined
  const tolgee = useTolgee()
  const locale = tolgee.getLanguage() || LOCALES.de
  const [isLoading, setIsLoading] = useState(false)

  const buildUrl = useCallback(() => {
    const params = new URLSearchParams({
      file,
      locale
    })
    if (projectId) {
      params.set('projectId', projectId)
    }
    return `/api/pdf?${params.toString()}`
  }, [file, locale, projectId])

  const href = buildUrl()

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      // ignore decoding errors and fallback to simple
    }
    return simple || fallback
  }

  const onClick = useCallback(async () => {
    try {
      setIsLoading(true)
      console.log('href', href)
      const response = await fetch(href, {cache: 'no-store'})
      if (!response.ok) throw new Error('Download fehlgeschlagen')

      const contentDisposition = response.headers.get('Content-Disposition')
      const defaultName =
        file === 'project' && projectId
          ? `ginonaumann-project-${projectId}-${locale}.pdf`
          : `ginonaumann-${file}-${locale}.pdf`
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
    } catch (error) {
      console.error('Download fehlgeschlagen:', error)
    } finally {
      setIsLoading(false)
    }
  }, [href, file, locale, projectId])

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      aria-busy={isLoading}
      {...buttonProps}>
      {isLoading ? (
        <Icon name="loader" className="animate-spin" />
      ) : (
        <Icon name="download" />
      )}
      {label}
    </Button>
  )
}
