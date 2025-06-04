import {cn} from '@/lib/cn'
import {forwardRef} from 'react'
import {Badge, BadgeProps} from './badge'
import {Project} from '@/lib/projects'
import {useTranslations} from 'next-intl'
import {Slot} from '@radix-ui/react-slot'

interface StatusBadgeProps extends BadgeProps {
  start: Project['start']
  end?: Project['end']
}

const StatusBadge = ({start, end, ...props}: StatusBadgeProps) => {
  const t = useTranslations('portfolio.projects')
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
        {t('status.in_progress')}
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
      'rounded-lg border border-muted shadow bg-background relative flex flex-col dark:shadow-primary h-full',
      className
    )}
    {...props}
  />
))
ProjectCard.displayName = 'ProjectCard'

const ProjectCardMain = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col p-6 gap-4 border-b border-muted grow',
      className
    )}
    {...props}
  />
))
ProjectCardMain.displayName = 'ProjectCardMain'

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

const ProjectCardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({className, ...props}, ref) => (
  <p
    ref={ref}
    className={cn('text-muted-foreground whitespace-pre-line', className)}
    {...props}
  />
))
ProjectCardDescription.displayName = 'ProjectCardDescription'

const ProjectCardInfo = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn(
      'p-6 flex flex-col gap-2 bg-card min-h-[154px] rounded-b-lg',
      className
    )}
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

const ProjectCardInfoLabel = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({className, ...props}, ref) => (
  <span ref={ref} className={cn('font-semibold', className)} {...props} />
))
ProjectCardInfoLabel.displayName = 'ProjectCardInfoLabel'

const ProjectCardInfoValue = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({className, ...props}, ref) => (
  <span
    ref={ref}
    className={cn('text-muted-foreground', className)}
    {...props}
  />
))
ProjectCardInfoValue.displayName = 'ProjectCardInfoValue'

const ProjectCardReference = forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean
  }
>(({asChild, className, ...props}, ref) => {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      ref={ref}
      className={cn(
        'transition-colors hover:text-foreground underline inline-flex items-center gap-0.5 text-foreground',
        className
      )}
      {...props}
    />
  )
})
ProjectCardReference.displayName = 'ProjectCardReference'

export {
  ProjectCard,
  ProjectCardMain,
  ProjectCardTitle,
  ProjectCardDescription,
  ProjectCardInfo,
  ProjectCardInfoItem,
  ProjectCardInfoLabel,
  ProjectCardInfoValue,
  ProjectCardReference,
  StatusBadge
}
