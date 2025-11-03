import {LOCALES} from '@/locales'
import fs from 'fs/promises'
import path from 'path'
import {serialize} from 'next-mdx-remote/serialize'
import {Technology} from '@/lib/types'
import matter from 'gray-matter'
import {IconName, IconPrefix} from '@/components/ui/icon'

const technologyDir = './technologies'

interface TechnologyFrontmatter {
  icon: IconName
  iconPrefix?: IconPrefix
  slug: string
  keywords?: string[]
  altNames?: string[]
  category?: string
}

async function getMdxMetadata(
  filePath: string
): Promise<TechnologyFrontmatter> {
  const source = await fs.readFile(filePath, 'utf-8')
  const {frontmatter} = await serialize(source, {
    parseFrontmatter: true
  })

  return {
    icon: (frontmatter?.icon as IconName) || 'circle',
    iconPrefix: frontmatter?.iconPrefix as IconPrefix,
    slug: (frontmatter?.slug as string) || '',
    keywords: frontmatter?.keywords as string[],
    altNames: frontmatter?.altNames as string[],
    category: frontmatter?.category as string
  }
}

async function extractSections(filePath: string): Promise<{
  name?: string
  intro: {[locale: string]: string}
}> {
  const source = await fs.readFile(filePath, 'utf-8')
  const {content} = matter(source)

  const h1Match = content.match(/^#\s+(.+)$/m)
  const name = h1Match ? h1Match[1].trim() : undefined

  const intro: {[locale: string]: string} = {}

  for (const locale of Object.keys(LOCALES) as (keyof typeof LOCALES)[]) {
    const regex = new RegExp(`##\\s+${locale}\\s*([\\s\\S]*?)(?=##|$)`, 'i')
    const match = content.match(regex)
    if (match) {
      intro[locale] = match[1].trim()
    }
  }

  return {name, intro}
}

async function scanTechnologies(): Promise<Technology[]> {
  const entries = await fs.readdir(technologyDir, {withFileTypes: true})
  const technologies: Technology[] = []

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.mdx')) {
      const filePath = path.join(technologyDir, entry.name)
      const technologyId = entry.name.replace('.mdx', '')

      const metadata = await getMdxMetadata(filePath)
      const sections = await extractSections(filePath)

      technologies.push({
        name: sections.name || technologyId,
        icon: metadata.icon,
        iconPrefix: metadata.iconPrefix,
        slug: metadata.slug,
        keywords: metadata.keywords,
        altNames: metadata.altNames,
        intro: sections.intro as Technology['intro'],
        category: metadata.category
      })
    }
  }

  return technologies
}

export const buildTechnologyIndex = async () => {
  try {
    const technologies = await scanTechnologies()

    await fs.writeFile(
      'lib/technologyIndex.json',
      JSON.stringify(technologies),
      'utf-8'
    )

    console.log(
      `✓ Successfully built technology index with ${technologies.length} technologies`
    )
  } catch (error) {
    console.error('Error building technology index:', error)
    throw error
  }
}
