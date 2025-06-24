import {format} from 'date-fns'
import {de} from 'date-fns/locale'

export const sanitizeString = (string?: string) => {
  if (!string) return ''
  return string.replace(/[^a-zA-Z0-9]/g, '')
}

export const generateDateOptions = (): string[] => {
  const dates: string[] = []
  const start = new Date()
  start.setDate(1)

  for (let i = 0; i < 24; i++) {
    const date = new Date(start.getFullYear(), start.getMonth() + i + 1, 0)
    const formattedDate = format(date, 'MMMM yyyy', {locale: de})
    dates.push(formattedDate)
  }

  return dates
}
