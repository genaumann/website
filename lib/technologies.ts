import technologyIndex from './technologyIndex.json'
import {Technology} from './types'

export interface TechnologyCategory {
  name: string
  technologies: Technology[]
}
export function getTechnologyCategories(): TechnologyCategory[] {
  const categories = new Map<string, Technology[]>()

  technologyIndex.forEach(tech => {
    const category = tech.category || 'other'
    if (!categories.has(category)) {
      categories.set(category, [])
    }
    categories.get(category)!.push(tech as Technology)
  })

  return Array.from(categories.entries()).map(([name, technologies]) => ({
    name,
    technologies
  }))
}

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
