import React, {SVGProps} from 'react'
import redhat from './redhat'
import {cn} from '@/lib/cn'
import TypeScript from './typescript'
import BookOpen from './book-open'
import Salt from './salt'
import Python from './python'
import Docker from './docker'
import ReactIcon from './react'
import GitLab from './gitlab'
import Ansible from './ansible'

export const customIconMap = {
  redhat: {
    Component: redhat,
    color: '#EE0000'
  },
  typescript: {
    Component: TypeScript,
    color: '#3178C6'
  },
  salt: {
    Component: Salt,
    color: '#57BCAD'
  },
  python: {
    Component: Python,
    color: '#3776AB'
  },
  docker: {
    Component: Docker,
    color: '#2496ED'
  },
  react: {
    Component: ReactIcon,
    color: '#61DAFB'
  },
  gitlab: {
    Component: GitLab,
    color: '#FC6D26'
  },
  ansible: {
    Component: Ansible,
    color: '#EE0000'
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
