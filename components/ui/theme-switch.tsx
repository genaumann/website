'use client'

import {useTheme} from 'next-themes'
import {Button} from './button'
import Icon, {IconName} from './icon'
import {cn} from '@/lib/cn'
import {ReactNode, useEffect, useState} from 'react'
import {useTranslations} from 'next-intl'

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
      {themeConfig.map(({name, icon}) => (
        <ThemeButton
          key={name}
          name={name}
          icon={icon}
          active={mounted && theme === name}
          onClick={mounted ? () => setTheme(name) : undefined}
        />
      ))}
    </ThemeWrapper>
  )
}

function ThemeButton({name, icon, active, onClick}: ThemeButtonProps) {
  const t = useTranslations()

  return (
    <Button
      key={name}
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(active && 'text-primary')}
      aria-label={t('common.themeSwitch')}>
      <Icon name={icon} />
    </Button>
  )
}

function ThemeWrapper({children}: {children: ReactNode}) {
  return (
    <div className="inline-flex whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input shadow-sm hover:text-accent-foreground h-9 py-2 hover:bg-inherit  bg-secondary items-center justify-between">
      {children}
    </div>
  )
}
