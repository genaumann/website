import technologyIndex from './technologyIndex.json'
import {Technology} from './types'

export function getTechnology(technologyName: string): Technology | undefined {
  let technology = technologyIndex.find(item => item.slug === technologyName)

  if (!technology) {
    technology = technologyIndex.find(item =>
      item.altNames?.includes(technologyName)
    )
  }

  return technology ? (technology as Technology) : undefined
}

export function getTechnologies(): Technology[] {
  return technologyIndex as Technology[]
}
