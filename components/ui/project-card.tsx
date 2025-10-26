import {cn} from '@/lib/cn'
import {forwardRef} from 'react'
import {Badge, BadgeProps} from './badge'
import {Project, TType} from '@/lib/types'

interface StatusBadgeProps extends BadgeProps {
  start: Project['start']
  end?: Project['end']
  t: TType
}

const StatusBadge = ({start, end, t, ...props}: StatusBadgeProps) => {
  const now = new Date()
  if (end && end < now) {
    return <Badge {...props}>{t('status.completed')}</Badge>
  } else if (start > now) {
    return (
      <Badge variant="secondary" {...props}>
        {t('status.upcoming')}
      </Badge>
    )
  } else {
    return (
      <Badge variant="outline" {...props}>
        {t('status.inProgress')}
      </Badge>
    )
  }
}

const ProjectCard = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn(
      'p-6 rounded-lg border border-muted border-dashed shadow bg-background relative flex flex-col gap-6 shadow-primary h-full',
      className
    )}
    {...props}
  />
))
ProjectCard.displayName = 'ProjectCard'

const ProjectCardTitle = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({className, ...props}, ref) => (
  <span
    ref={ref}
    className={cn('line-clamp-2 text-2xl font-bold', className)}
    {...props}
  />
))
ProjectCardTitle.displayName = 'ProjectCardTitle'

const ProjectCardInfo = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props} />
))
ProjectCardInfo.displayName = 'ProjectCardInfo'

const ProjectCardInfoItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div ref={ref} className={cn('flex gap-2 text-sm', className)} {...props} />
))
ProjectCardInfoItem.displayName = 'ProjectCardInfoItem'

export {
  ProjectCard,
  ProjectCardTitle,
  ProjectCardInfo,
  ProjectCardInfoItem,
  StatusBadge
}
