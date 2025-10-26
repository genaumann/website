'use client'

import {useState, useMemo, useCallback} from 'react'
import Fuse from 'fuse.js'
import {Technology} from '@/lib/types'

export function useTechnologySearch(allTechnologies: Technology[]) {
  const [searchQuery, setSearchQuery] = useState('')

  const fuse = useMemo(() => {
    if (!allTechnologies || allTechnologies.length === 0) return null

    return new Fuse(allTechnologies, {
      keys: [
        {name: 'name', weight: 2},
        {name: 'intro', weight: 0.7},
        {name: 'slug', weight: 1}
      ],
      includeMatches: true,
      threshold: 0.3,
      ignoreLocation: true
    })
  }, [allTechnologies])

  const filteredTechnologies = useMemo(() => {
    if (!allTechnologies || allTechnologies.length === 0) return []
    if (!searchQuery || searchQuery.trim() === '') return allTechnologies
    if (!fuse) return []

    const searchResults = fuse.search(searchQuery)
    return searchResults.map(result => result.item)
  }, [allTechnologies, searchQuery, fuse])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  return {
    searchQuery,
    filteredTechnologies,
    handleSearch
  }
}
