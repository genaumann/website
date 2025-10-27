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
import SUSE from './suse'
import AWX from './awx'
import Uyuni from './uyuni'
import Tux from './tux'
import Icinga from './icinga'
import Playwright from './playwright'
import NextJS from './nextjs'
import NextJSLight from './nextjs-light'
import Podman from './podman'
import Tolgeee from './tolgee'
import Kubernetes from './kubernetes'

export const customIconMap = {
  redhat: {
    Component: redhat,
    color: '#000000'
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
    color: '#000000'
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
    color: '#000000'
  },
  ansible: {
    Component: Ansible,
    color: '#EE0000'
  },
  suse: {
    Component: SUSE,
    color: '#000000'
  },
  awx: {
    Component: AWX,
    color: '#000000'
  },
  uyuni: {
    Component: Uyuni,
    color: '#000000'
  },
  tux: {
    Component: Tux,
    color: '#000000'
  },
  icinga: {
    Component: Icinga,
    color: '#06062C'
  },
  icingaDark: {
    Component: Icinga,
    color: '#FFFFFF'
  },
  playwright: {
    Component: Playwright,
    color: '#000000'
  },
  nextjs: {
    Component: NextJSLight,
    color: '#000000'
  },
  nextjsDark: {
    Component: NextJS,
    color: '#FFFFFF'
  },
  podman: {
    Component: Podman,
    color: '#0000000'
  },
  tolgee: {
    Component: Tolgeee,
    color: '#0000000'
  },
  bookOpen: {
    Component: BookOpen,
    color: '#000000'
  },
  kubernetes: {
    Component: Kubernetes,
    color: '#326CE5'
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
