'use client'

import {useTranslations} from 'next-intl'
import type {Article} from '@/lib/types'
import {
  useState,
  useEffect,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent
} from 'react'
import Fuse, {type FuseResult} from 'fuse.js'
import {useRouter} from 'next/navigation'
import Icon from '../ui/icon'
import {Button} from '../ui/button'
import {useArticleIndex} from '@/app/[locale]/kb/[...kb]/hooks'
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '../ui/dialog'
import {Input} from '../ui/input'
import {Separator} from '../ui/separator'
import {Skeleton} from '../ui/skeleton'
import {useIsMobile} from '../hooks/mobile'
import {cn} from '@/lib/cn'

export default function SearchCommand({locale}: {locale: string}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useIsMobile()
  const t = useTranslations()

  useEffect(() => {
    setIsLoading(false)
    if (isMobile) return
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [isOpen, isMobile])

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="hover:bg-inherit w-28 md:w-36 bg-secondary items-center justify-between md:mt-2">
        {isLoading ? (
          <Skeleton className="h-5 w-full" />
        ) : (
          <>
            {isMobile && <Icon name="magnifying-glass" />}
            <span>{t('common.search')}...</span>
            {!isMobile && (
              <kbd className="inline-flex h-5 items-center gap-1 rounded bg-background/75 px-1.5 font-mono text-[10px] text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            )}
          </>
        )}
      </Button>
      {isOpen && (
        <SearchDialog
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          locale={locale}
        />
      )}
    </>
  )
}

function SearchDialog({
  locale,
  isOpen,
  onOpenChange
}: {
  locale: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}) {
  const [results, setResults] = useState<FuseResult<Article>[] | []>([])
  const {data: articles, isLoading} = useArticleIndex(locale)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  )
  const router = useRouter()
  const t = useTranslations()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // useEffect(() => {
  //   setSelectedIndex(0)
  // }, [results])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (listRef.current && selectedIndex) {
      const selectedElement = listRef.current.children[
        selectedIndex
      ] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest'
        })
      }
    }
  }, [selectedIndex])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!articles || articles.length === 0) {
      setResults([])
      return
    }

    const fuse = new Fuse(articles, {
      keys: [
        {name: 'title', weight: 2},
        {name: 'content', weight: 1}
      ],
      includeMatches: true,
      threshold: 0.3,
      ignoreLocation: true
    })
    setResults(fuse.search(query))
  }

  const handleSelect = (slug: string) => {
    onOpenChange(false)
    router.push(`/kb/${slug}`)
  }

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    const displayedItems = getDisplayedItems()

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prevIndex => {
          if (prevIndex === undefined) return 0
          return prevIndex < displayedItems.length - 1
            ? prevIndex + 1
            : prevIndex
        })
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prevIndex => {
          if (prevIndex === undefined) return 0
          return prevIndex > 0 ? prevIndex - 1 : prevIndex
        })
        break
      case 'Enter':
        e.preventDefault()
        if (
          displayedItems.length > 0 &&
          selectedIndex !== undefined &&
          selectedIndex >= 0
        ) {
          const selectedItem = displayedItems[selectedIndex]
          handleSelect(selectedItem.slug)
        }
        break
      case 'Escape':
        e.preventDefault()
        onOpenChange(false)
        break
    }
  }

  const getDisplayedItems = (): Article[] => {
    if (results.length > 0) {
      return results.map(result => result.item)
    } else if (articles && searchQuery === '') {
      return articles.slice(0, 7)
    }
    return []
  }

  const displayedItems = getDisplayedItems()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border-0 h-[460px] max-h-[460px] max-w-[370px] sm:max-w-md md:max-w-xl md:w-xl overflow-x-clip">
        <DialogHeader className="hidden mb-6">
          <DialogTitle>{t('common.search')}</DialogTitle>
        </DialogHeader>
        <Input
          ref={inputRef}
          placeholder={t('common.lookingFor')}
          className="border-0 focus-visible:ring-0 placeholder:text-lg -mt-1 text-lg"
          onInput={e => handleSearch(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
        <Separator className="-mx-10 w-[150%]" />
        {isLoading ? (
          <ArticleSkeleton />
        ) : (
          <ul
            ref={listRef}
            className="space-y-2 h-80 max-h-[380px] overflow-y-auto">
            {displayedItems.length > 0 ? (
              displayedItems.map((item, index) => (
                <li
                  className={cn(
                    'p-2 hover:rounded-md transition-colors cursor-pointer',
                    selectedIndex === index
                      ? 'bg-accent text-accent-foreground rounded-md'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  )}
                  key={item.slug}
                  onClick={() => handleSelect(item.slug)}>
                  <Icon
                    name={item.icon ? item.icon : 'newspaper'}
                    prefix={item.iconPrefix ? item.iconPrefix : 'fal'}
                    className="mr-3 inline-flex"
                  />
                  {item.title}
                </li>
              ))
            ) : (
              <li className="text-center">{t('common.noResults')}</li>
            )}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  )
}

function ArticleSkeleton() {
  return (
    <>
      {Array.from({length: 7}).map((_, index) => (
        <Skeleton key={index} className="h-8" />
      ))}
    </>
  )
}
