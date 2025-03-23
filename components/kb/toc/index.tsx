'use client'

import {useEffect, useState} from 'react'
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

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))

    const items = elements.map(element => {
      if (!element.id) {
        element.id =
          element.textContent?.trim().toLowerCase().replace(/\s+/g, '-') || ''
      }

      return {
        id: element.id,
        text: element.textContent || '',
        level: Number.parseInt(element.tagName.charAt(1))
      }
    })

    setHeadings(items)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-130px 0px -80% 0px'
      }
    )

    elements.forEach(element => {
      observer.observe(element)
    })

    return () => {
      elements.forEach(element => {
        observer.unobserve(element)
      })
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
                'block py-2 text-sm transition-colors hover:underline',
                activeId === heading.id
                  ? 'dark:text-primary/60 text-primary'
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
