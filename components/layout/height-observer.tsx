'use client'

import {useEffect} from 'react'

export default function HeightObserver() {
  useEffect(() => {
    const updateHeights = () => {
      const header = document.querySelector('header')
      const footer = document.querySelector('footer')

      if (header && footer) {
        document.documentElement.style.setProperty(
          '--header-height',
          `${header.offsetHeight}px`
        )
        document.documentElement.style.setProperty(
          '--footer-height',
          `${footer.offsetHeight}px`
        )
      }
    }

    const observer = new ResizeObserver(updateHeights)

    const header = document.querySelector('header')
    const footer = document.querySelector('footer')

    if (header) observer.observe(header)
    if (footer) observer.observe(footer)

    updateHeights()

    return () => observer.disconnect()
  }, [])

  return null
}
