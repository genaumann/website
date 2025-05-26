import * as React from 'react'
import {cn} from '@/lib/cn'
import Icon, {IconProps} from './icon'

const MacOSWindow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn(
      'w-full rounded-md bg-card overflow-hidden shadow-md',
      className
    )}
    {...props}
  />
))
MacOSWindow.displayName = 'MacOSWindow'

const MacOSWindowHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn(
      'px-4 py-3 bg-muted flex items-center h-8 border-b border-b-muted-foreground/10',
      className
    )}
    {...props}
  />
))
MacOSWindowHeader.displayName = 'MacOSWindowHeader'

const MacOSWindowHeaderButtons = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div ref={ref} className={cn('flex gap-2 shrink-0', className)} {...props}>
    <div className="h-3 w-3 rounded-full bg-red-500" />
    <div className="h-3 w-3 rounded-full bg-yellow-500" />
    <div className="h-3 w-3 rounded-full bg-green-500" />
  </div>
))
MacOSWindowHeaderButtons.displayName = 'MacOSWindowHeaderButtons'

const MacOSWindowTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex justify-center items-center text-xs w-full font-mono text-muted-foreground',
      className
    )}
    {...props}
  />
))
MacOSWindowTitle.displayName = 'MacOSWindowTitle'

const MacOSWindowTitleIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({className, ...props}, ref) => (
    <Icon ref={ref} className={cn('mr-1', className)} {...props} />
  )
)
MacOSWindowTitleIcon.displayName = 'MacOSWindowTitleIcon'

const MacOSWindowTitleText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn('font-mono text-muted-foreground', className)}
    {...props}
  />
))
MacOSWindowTitleText.displayName = 'MacOSWindowTitleText'

const MacOSWindowContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div ref={ref} className={className} {...props} />
))
MacOSWindowContent.displayName = 'MacOSWindowContent'

export {
  MacOSWindow,
  MacOSWindowHeader,
  MacOSWindowHeaderButtons,
  MacOSWindowTitle,
  MacOSWindowTitleIcon,
  MacOSWindowTitleText,
  MacOSWindowContent
}
