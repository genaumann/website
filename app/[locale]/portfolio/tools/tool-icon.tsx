'use client'

import Icon from '@/components/ui/icon'
import {Tool} from '@/lib/tools'
import {useEffect, useState} from 'react'
import {useTheme} from 'next-themes'

type ToolIconProps = Pick<Tool, 'icon' | 'iconPrefix'>

export default function TechnologyIcon({icon, iconPrefix}: ToolIconProps) {
  const {theme, systemTheme} = useTheme()
  const [isDark, setIsDark] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    setIsDark(
      theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
    )
  }, [theme, systemTheme])

  return (
    <Icon
      name={
        typeof icon === 'string' ? icon : icon[`${isDark ? 'dark' : 'light'}`]
      }
      prefix={iconPrefix}
      aria-hidden="true"
    />
  )
}
