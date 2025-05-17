import React, {SVGProps} from 'react'
import redhat from './redhat'
import {cn} from '@/lib/cn'
import TypeScript from './typescript'
import BookOpen from './book-open'

export const customIconMap = {
  redhat: {
    Component: redhat,
    color: '#EE0000'
  },
  typescript: {
    Component: TypeScript,
    color: '#3178C6'
  },
  bookOpen: {
    Component: BookOpen,
    color: '#000000'
  }
}

type IconName = keyof typeof customIconMap

type CustomIconProps = {
  name: IconName
} & SVGProps<SVGSVGElement>

const CustomIcon: React.FC<CustomIconProps> = ({name, className, ...props}) => {
  const color = customIconMap[name]?.color || 'var(--foreground)'
  const Component = customIconMap[name]?.Component

  return (
    <Component
      fill={color}
      className={cn('svg-inline--fa fa-fw', className)}
      {...props}
    />
  )
}

export default CustomIcon
export type CustomIconName = IconName
