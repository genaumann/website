'use client'

import {Button} from '@/components/ui/button'
import {ClipboardCheckIcon, ClipboardIcon} from 'lucide-react'
import {useTranslate} from '@tolgee/react'
import {useState} from 'react'

export default function CodeBlockCopyButton({id}: {id?: string}) {
  const [copied, setCopied] = useState(false)
  const {t} = useTranslate('kb')

  if (!id) return null

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

  return (
    <Button
      onClick={copyToClipboard}
      variant="ghost"
      aria-label={t('copyCode')}
      className="cursor-pointer group hover:bg-transparent">
      {copied ? (
        <ClipboardCheckIcon width={16} height={16} />
      ) : (
        <ClipboardIcon width={16} height={16} />
      )}
    </Button>
  )
}
