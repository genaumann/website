'use client'

import {useTranslations} from 'next-intl'
import {tools as getAllTools} from '../../../../lib/tools'
import {useEffect, useRef} from 'react'
import {Input} from '@/components/ui/input'
import TechnologyCard from './card'
import {useToolSearch} from '../hooks'

export default function TechnologyGridPage() {
  const t = useTranslations('portfolio.tools')
  const allTools = getAllTools(t)
  const inputRef = useRef<HTMLInputElement>(null)

  const {filteredTools, handleSearch} = useToolSearch(allTools)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="pb-10">
      <div className="flex justify-center">
        <Input
          ref={inputRef}
          onChange={e => handleSearch(e.target.value)}
          className="w-full md:w-1/2 mx-auto h-12 placeholder:text-center placeholder:text-base mb-4"
          placeholder={t('search.placeholder')}
          type="search"
          aria-label={t('search.placeholder')}
        />
      </div>

      {filteredTools.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm">
          {t('search.noResults')}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4" role="grid">
          {filteredTools.map((tool, index) => (
            <TechnologyCard key={index} tool={tool} />
          ))}
        </div>
      )}
    </div>
  )
}
