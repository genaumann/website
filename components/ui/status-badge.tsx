import {Badge, BadgeProps} from './badge'
import {getTranslations} from 'next-intl/server'
import Icon, {IconName} from './icon'
import {
  Availability,
  employeeStatus,
  employeeStatusUntil,
  partiallyOption
} from '@/lib/flags'
import {Tooltip, TooltipContent, TooltipTrigger} from './tooltip'
import {HTMLAttributes} from 'react'

type VariantMapping = Record<Availability, BadgeProps['variant']>
type IconMapping = Record<Availability, IconName>
type TextMapping = Record<Availability, string>

export default async function StatusBadge({
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const status = await employeeStatus()
  const partially = await partiallyOption()
  const until = await employeeStatusUntil()
  const t = await getTranslations('portfolio.status')

  const variant: VariantMapping = {
    available: 'default',
    unavailable: 'destructive',
    'partially available': 'secondary'
  }

  const icon: IconMapping = {
    available: 'check-circle',
    unavailable: 'xmark-circle',
    'partially available': 'exclamation-circle'
  }

  const badgeText: TextMapping = {
    available: t('available'),
    unavailable: t('notAvailable'),
    'partially available': t('partiallyAvailable')
  }

  const tooltipText: TextMapping = {
    available: until ? t('tooltip.availableUntil', {until}) : t('available'),
    unavailable: until
      ? t('tooltip.unavailableUntil', {until})
      : t('notAvailable'),
    'partially available':
      partially && until
        ? t('tooltip.partiallyAvailableUntil', {
            until,
            percentage: partially
          })
        : partially && !until
          ? t('tooltip.partiallyAvailable', {percentage: partially})
          : t('partiallyAvailable')
  }

  return (
    <Tooltip>
      <div {...props}>
        <TooltipTrigger asChild>
          <Badge
            variant={variant[status]}
            className="inline-flex gap-1 items-center cursor-help">
            <Icon name={icon[status]} />
            {badgeText[status]}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>{tooltipText[status]}</TooltipContent>
      </div>
    </Tooltip>
  )
}
