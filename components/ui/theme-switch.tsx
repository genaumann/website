'use client'

import React from 'react'

import {useTheme} from 'next-themes'
import {Button} from './button'
import Icon, {type IconName} from './icon'
import {cn} from '@/lib/cn'
import {type ReactNode, useEffect, useState} from 'react'
import {useTranslate} from '@tolgee/react'

interface ThemeConfig {
  name: string
  icon: IconName
}

interface ThemeButtonProps {
  name: string
  icon: IconName
  active?: boolean
  onClick?: () => void
}

export default function ThemeSwitch() {
  const {theme, setTheme} = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const themeConfig: ThemeConfig[] = [
    {
      name: 'dark',
      icon: 'moon'
    },
    {
      name: 'light',
      icon: 'sun-bright'
    },
    {
      name: 'system',
      icon: 'display'
    }
  ]

  return (
    <ThemeWrapper>
      {themeConfig.map(({name, icon}, index) => (
        <React.Fragment key={name}>
          <ThemeButton
            name={name}
            icon={icon}
            active={mounted && theme === name}
            onClick={mounted ? () => setTheme(name) : undefined}
          />
          {index < themeConfig.length - 1 && (
            <div className="h-full w-px bg-input" aria-hidden="true" />
          )}
        </React.Fragment>
      ))}
    </ThemeWrapper>
  )
}

function ThemeButton({name, icon, active, onClick}: ThemeButtonProps) {
  const {t} = useTranslate()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        'cursor-pointer hover:bg-transparent group rounded-none',
        active && 'bg-primary/20',
        active && name === 'dark' && 'rounded-l-md',
        active && name === 'system' && 'rounded-r-md'
      )}
      aria-label={t('themeSwitch')}>
      <Icon
        name={icon}
        className="transition-transform duration-200 group-hover:scale-125"
      />
    </Button>
  )
}

function ThemeWrapper({children}: {children: ReactNode}) {
  return (
    <div className="inline-flex whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input shadow-sm h-9 bg-secondary/40 items-center justify-between">
      {children}
    </div>
  )
}
