'use client'

import {useEffect, useState, useRef} from 'react'
import Link from 'next/link'
import {cn} from '@/lib/cn'

interface TOCItem {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const collectHeadings = () => {
      const elements = Array.from(
        document.querySelectorAll('h2, h3, h4, h5, h6')
      )

      const items = elements.map(element => ({
        id: element.id,
        text: element.textContent || '',
        level: Number.parseInt(element.tagName.charAt(1))
      }))

      requestAnimationFrame(() => {
        setHeadings(items)
      })

      return elements
    }

    const elements = collectHeadings()

    observerRef.current = new IntersectionObserver(
      entries => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting)

        if (visibleEntries.length > 0) {
          const sortedEntries = visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )
          const topEntry = sortedEntries[0]

          if (topEntry) {
            setActiveId(topEntry.target.id)
          }
        }
      },
      {
        rootMargin: '-130px 0px -80% 0px'
      }
    )

    const observer = observerRef.current

    elements.forEach(element => {
      observer.observe(element)
    })

    return () => {
      elements.forEach(element => {
        observer.unobserve(element)
      })
      observer.disconnect()
    }
  }, [])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav>
      <ul>
        {headings.map(heading => (
          <li
            key={heading.id}
            style={{paddingLeft: `${(heading.level - 2) * 1}rem`}}>
            <Link
              href={`#${heading.id}`}
              className={cn(
                'block py-2 text-sm transition-colors hover:underline text-muted-foreground',
                activeId === heading.id
                  ? 'font-semibold text-foreground'
                  : 'text-muted-foreground'
              )}
              onClick={e => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth'
                })
              }}>
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
