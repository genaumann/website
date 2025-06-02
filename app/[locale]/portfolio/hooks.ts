'use client'

import {useState, useMemo, useCallback} from 'react'
import Fuse from 'fuse.js'
import type {Tool} from '@/lib/tools'

export function useToolSearch(allTools: Tool[]) {
  const [searchQuery, setSearchQuery] = useState('')

  const fuse = useMemo(() => {
    if (!allTools || allTools.length === 0) return null

    return new Fuse(allTools, {
      keys: [
        {name: 'name', weight: 2},
        {name: 'intro', weight: 0.7},
        {name: 'slug', weight: 1}
      ],
      includeMatches: true,
      threshold: 0.3,
      ignoreLocation: true
    })
  }, [allTools])

  const filteredTools = useMemo(() => {
    if (!allTools || allTools.length === 0) return []
    if (!searchQuery || searchQuery.trim() === '') return allTools
    if (!fuse) return []

    const searchResults = fuse.search(searchQuery)
    return searchResults.map(result => result.item)
  }, [allTools, searchQuery, fuse])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  return {
    searchQuery,
    filteredTools,
    handleSearch
  }
}
