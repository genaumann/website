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
    return (
      <Badge className="font-oswald" {...props}>
        {t('status.completed')}
      </Badge>
    )
  } else if (start > now) {
    return (
      <Badge variant="secondary" className="font-oswald" {...props}>
        {t('status.upcoming')}
      </Badge>
    )
  } else {
    return (
      <Badge variant="outline" className="font-oswald" {...props}>
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
      'rounded-lg border border-muted border-dashed shadow bg-background relative flex flex-col gap-6 shadow-primary h-full',
      'transition-all duration-300 ease-out transform-gpu',
      'hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20',
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
    className={cn(
      'p-4 text-2xl font-semibold text-center font-oswald',
      className
    )}
    {...props}
  />
))
ProjectCardTitle.displayName = 'ProjectCardTitle'

const ProjectCardInfo = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn('px-4 flex flex-col gap-2 items-center', className)}
    {...props}
  />
))
ProjectCardInfo.displayName = 'ProjectCardInfo'

const ProjectCardInfoItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div ref={ref} className={cn('flex gap-2 text-sm', className)} {...props} />
))
ProjectCardInfoItem.displayName = 'ProjectCardInfoItem'

const ProjectCardTechnologies = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn(
      'p-4 flex gap-2 text-sm border-t border-muted border-dashed pt-4 items-center justify-center mt-auto',
      className
    )}
    {...props}
  />
))
ProjectCardTechnologies.displayName = 'ProjectCardTechnologies'

export {
  ProjectCard,
  ProjectCardTitle,
  ProjectCardInfo,
  ProjectCardInfoItem,
  StatusBadge,
  ProjectCardTechnologies
}
