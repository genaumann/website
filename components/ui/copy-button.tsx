'use client'

import {Button} from '@/components/ui/button'
import Icon from '@/components/ui/icon'
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
  )
}
