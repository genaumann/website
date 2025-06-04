'use client'

import {useState} from 'react'
import {useEffect} from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile(breakpoint?: number): boolean {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)
  const effectiveBreakpoint = breakpoint ?? MOBILE_BREAKPOINT

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${effectiveBreakpoint - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < effectiveBreakpoint)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < effectiveBreakpoint)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}
