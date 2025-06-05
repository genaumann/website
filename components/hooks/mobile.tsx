'use client'

import {useState, useEffect} from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const updateIsMobile = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches)
    }
    updateIsMobile(mql)
    mql.addEventListener('change', updateIsMobile)
    return () => mql.removeEventListener('change', updateIsMobile)
  }, [])

  return isMobile
}
