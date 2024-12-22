import React, {SVGProps} from 'react'
import redhat from './redhat'
import {cn} from '@/lib/cn'

const iconMap = {
  redhat: {
    Component: redhat,
    color: '#EE0000'
  }
}

type IconName = keyof typeof iconMap

type CustomIconProps = {
  name: IconName
} & SVGProps<SVGSVGElement>

const CustomIcon: React.FC<CustomIconProps> = ({name, className, ...props}) => {
  const color = iconMap[name]?.color || 'var(--foreground)'
  const Component = iconMap[name]?.Component

  return (
    <Component
      fill={color}
      className={cn('h-[1em] w-[1.25em]', className)}
      {...props}
    />
  )
}

export default CustomIcon
export type CustomIconName = IconName
