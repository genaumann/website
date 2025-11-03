'use client'

import {useEffect, useRef} from 'react'
import {Input} from '@/components/ui/input'
import TechnologyCard from './card'
import {useTechnologySearch} from '../hooks'
import {useTranslate} from '@tolgee/react'
import {getTechnologies} from '@/lib/technologies'

export default function TechnologyGridPage() {
  const {t} = useTranslate()
  const inputRef = useRef<HTMLInputElement>(null)
  const allTechnologies = getTechnologies()

  const {filteredTechnologies, handleSearch} =
    useTechnologySearch(allTechnologies)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="pb-10">
      <div className="flex justify-center">
        <Input
          ref={inputRef}
          onChange={e => handleSearch(e.target.value)}
          className="w-full md:w-1/2 mx-auto h-12 placeholder:text-center placeholder:text-base mb-6"
          placeholder={t('search')}
          type="search"
        />
      </div>

      {filteredTechnologies.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm">
          {t('noResults')}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredTechnologies.map((technology, index) => (
            <TechnologyCard key={index} technology={technology} />
          ))}
        </div>
      )}
    </div>
  )
}
