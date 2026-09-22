'use client'

import {useTheme} from 'next-themes'
import {useMemo} from 'react'
import {ColorScheme} from './types'

type ThemeType = ColorScheme | 'system'

export const useColorScheme = (): ColorScheme => {
  const {theme: themeName, systemTheme} = useTheme() as {
    theme: ThemeType
    systemTheme: ThemeType
  }

  const theme = useMemo(() => {
    if (themeName !== 'system') {
      return themeName
    }
    return systemTheme === 'dark' ? 'dark' : 'light'
  }, [themeName, systemTheme])

  return theme
}
