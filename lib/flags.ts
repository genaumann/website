import {flag} from 'flags/next'
import {get} from '@vercel/edge-config'
import {generateDateOptions} from './string'

export type Availability = 'available' | 'unavailable' | 'partially available'
type PartiallyOptions = 20 | 40 | 60 | 80 | undefined

type EdgeConfig = {
  employeeStatus: Availability
  partiallyOption?: PartiallyOptions
  employeeStatusUntil?: string
}

const getConfig = async (): Promise<EdgeConfig | undefined> => get('website')

export const employeeStatus = flag<Availability>({
  key: 'employeeStatus.status',
  defaultValue: 'available',
  description: 'Availability status of the employee',
  options: [
    {value: 'unavailable', label: 'Unavailable'},
    {value: 'available', label: 'Available'},
    {value: 'partially available', label: 'Partially Available'}
  ],
  async decide() {
    const config = await getConfig()
    return config?.employeeStatus || 'available'
  }
})

export const partiallyOption = flag<PartiallyOptions | null>({
  key: 'employeeStatus.partiallyOption',
  description: 'Percentage of availability when partially available',
  options: [20, 40, 60, 80],
  async decide() {
    const config = await getConfig()

    return config?.partiallyOption || null
  }
})

export const employeeStatusUntil = flag<string | null>({
  key: 'employeeStatus.statusUntil',
  description: 'Date until the status is valid',
  options: generateDateOptions(),
  async decide() {
    const config = await getConfig()
    return config?.employeeStatusUntil || null
  }
})
