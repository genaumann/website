import {getLocale} from 'next-intl/server'
import {Badge} from '../badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../card'
import Icon from '../icon'
import {Training} from '@/lib/trainings'
import {getDateFunctions} from '@/lib/dates'
import {getTranslate} from '@/lib/integrations/tolgee/server'

type TrainingCardProps = {
  training: Training
}

export async function TrainingCard({training}: TrainingCardProps) {
  const locale = await getLocale()
  const {format} = getDateFunctions(locale)
  const t = await getTranslate()

  return (
    <Card className="max-w-9/12 md:max-w-2/3 mx-auto dark:shadow dark:shadow-primary">
      <CardHeader className="py-3">
        <div className="flex justify-between">
          <Icon
            name={training.iconName}
            prefix={training.iconPrefix}
            className="text-4xl"
          />
          <Badge variant="secondary" className="gap-1">
            <Icon name="calendar" />
            {t('days', {days: training.days})}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 bg-background pt-4 rounded-b-xl">
        <div className="space-y-2">
          <CardTitle className="text-2xl">{training.name}</CardTitle>
          <Badge variant="muted">
            <Icon name="calendar" />
            {format(training.date, 'MMMM yyyy')}
          </Badge>
        </div>

        <CardDescription className="text-base">
          {training.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
