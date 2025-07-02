'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../select'
import type {ProjectContext} from '@/lib/projects'
import {useTranslate} from '@tolgee/react'

export type ProjectContextFilter = Exclude<ProjectContext, 'freelance'> | 'all'
type ProjectContextObject = Record<ProjectContextFilter, string>

type PortfolioProjectFilterProps = {
  onChange: (value: ProjectContextFilter) => void
  value: ProjectContextFilter
}

export default function PortfolioProjectFilter({
  onChange,
  value
}: PortfolioProjectFilterProps) {
  const {t} = useTranslate('portfolio')

  const contexts: ProjectContextObject = {
    all: t('allProjects'),
    personal: t('personalProjects', {count: 2}),
    work: t('customerProjects')
  }

  return (
    <Select
      onValueChange={value => onChange(value as ProjectContextFilter)}
      value={value}>
      <SelectTrigger className="w-[146px] mx-auto">
        <SelectValue>{contexts[value]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.keys(contexts).map(context => (
          <SelectItem key={context} value={context}>
            {contexts[context as keyof ProjectContextObject]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
