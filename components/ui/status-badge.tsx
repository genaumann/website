import {Badge, BadgeProps} from './badge'
import {CheckCircleIcon, XCircleIcon, TriangleAlertIcon} from 'lucide-react'
import {
  Availability,
  employeeStatus,
  employeeStatusUntil,
  partiallyOption
} from '@/lib/flags'
import {Tooltip, TooltipContent, TooltipTrigger} from './tooltip'
import {HTMLAttributes} from 'react'
import {getTranslate} from '@/lib/integrations/tolgee/server'

type VariantMapping = Record<Availability, BadgeProps['variant']>
type IconMapping = Record<Availability, React.ReactNode>
type TextMapping = Record<Availability, string>

export default async function StatusBadge({
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const status = await employeeStatus()
  const partially = await partiallyOption()
  const until = await employeeStatusUntil()
  const t = await getTranslate('portfolio')

  const variant: VariantMapping = {
    available: 'default',
    unavailable: 'destructive',
    'partially available': 'secondary'
  }

  const icon: IconMapping = {
    available: <CheckCircleIcon />,
    unavailable: <XCircleIcon height={14} width={14} />,
    'partially available': <TriangleAlertIcon />
  }

  const badgeText: TextMapping = {
    available: t('available'),
    unavailable: t('unavailable'),
    'partially available': t('partiallyAvailable')
  }

  const tooltipText: TextMapping = {
    available: until ? t('availableUntil', {until}) : t('available'),
    unavailable: until ? t('unavailableUntil', {until}) : t('unavailable'),
    'partially available':
      partially && until
        ? t('partiallyAvailableUntil', {
            until,
            percentage: partially
          })
        : partially && !until
          ? t('partiallyAvailablePercentage', {percentage: partially})
          : t('partiallyAvailable')
  }

  return (
    <Tooltip>
      <div {...props}>
        <TooltipTrigger asChild>
          <Badge
            variant={variant[status]}
            className="inline-flex gap-1 items-center justify-center cursor-help font-oswald">
            {icon[status]}
            {badgeText[status]}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>{tooltipText[status]}</TooltipContent>
      </div>
    </Tooltip>
  )
}
