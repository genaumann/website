import {LOCALES} from '@/locales'
import fs from 'fs/promises'
import path from 'path'
import {serialize} from 'next-mdx-remote/serialize'
import {Project, ProjectContext} from '@/lib/types'
import matter from 'gray-matter'

const projectDir = './projects'

interface ProjectFrontmatter {
  technologies: string[]
  references?: {label?: string; url: string}[]
  context: ProjectContext
  start: string
  end?: string
  name?: string
}

async function getMdxMetadata(filePath: string): Promise<ProjectFrontmatter> {
  const source = await fs.readFile(filePath, 'utf-8')
  const {frontmatter} = await serialize(source, {
    parseFrontmatter: true
  })

  return {
    technologies: (frontmatter?.technologies as string[]) || [],
    references: frontmatter?.references as {label?: string; url: string}[],
    context: (frontmatter?.context as ProjectContext) || 'personal',
    start: (frontmatter?.start as string) || new Date().toISOString(),
    end: frontmatter?.end as string,
    name: frontmatter?.name as string
  }
}

async function extractSections(filePath: string): Promise<{
  name?: string
  project_overview?: string
  challenge?: string
  goals?: string
  approach?: string
  implementation?: string
  results?: string
  insights?: string
}> {
  const source = await fs.readFile(filePath, 'utf-8')
  const {content} = matter(source)

  const sections: Record<string, string> = {}

  // Extract H1 for name
  const h1Match = content.match(/^#\s+(.+)$/m)
  if (h1Match) {
    sections.name = h1Match[1].trim()
  }

  // Extract H2 sections as raw MDX strings
  const h2Sections = [
    'project_overview',
    'challenge',
    'goals',
    'approach',
    'implementation',
    'results',
    'insights'
  ]

  for (const section of h2Sections) {
    const regex = new RegExp(`##\\s+${section}\\s*([\\s\\S]*?)(?=##|$)`, 'i')
    const match = content.match(regex)
    if (match) {
      sections[section] = match[1].trim()
    }
  }

  return sections
}

async function scanProjects(): Promise<{[key: string]: Project}> {
  const entries = await fs.readdir(projectDir, {withFileTypes: true})
  const projects: {[key: string]: Project} = {}

  // Group files by project ID
  const projectFiles: {[key: string]: {[locale: string]: string}} = {}

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.mdx')) {
      const match = entry.name.match(/^(.+)\.(de|en)\.mdx$/)
      if (match) {
        const [, projectId, locale] = match
        if (!projectFiles[projectId]) {
          projectFiles[projectId] = {}
        }
        projectFiles[projectId][locale] = path.join(projectDir, entry.name)
      }
    }
  }

  // Process each project
  for (const [projectId, localeFiles] of Object.entries(projectFiles)) {
    const content: Record<string, Project['content']['de']> = {}
    const names: Record<string, string> = {}
    let baseMetadata: ProjectFrontmatter | null = null

    for (const locale of Object.keys(LOCALES) as (keyof typeof LOCALES)[]) {
      const filePath = localeFiles[locale]
      if (!filePath) continue

      const metadata = await getMdxMetadata(filePath)
      const sections = await extractSections(filePath)

      if (!baseMetadata) {
        baseMetadata = metadata
      }

      // Store localized name
      names[locale] = sections.name || metadata.name || projectId

      content[locale] = {
        project_overview: sections.project_overview || '',
        challenge: sections.challenge || '',
        goals: sections.goals,
        approach: sections.approach || '',
        implementation: sections.implementation,
        results: sections.results,
        insights: sections.insights
      }
    }

    if (baseMetadata) {
      projects[projectId] = {
        id: projectId,
        name: names as Project['name'],
        technologies: baseMetadata.technologies,
        references: baseMetadata.references,
        context: baseMetadata.context,
        start: new Date(baseMetadata.start),
        end: baseMetadata.end ? new Date(baseMetadata.end) : undefined,
        content: content as Project['content']
      }
    }
  }

  return projects
}

export const buildProjectIndex = async () => {
  try {
    const projects = await scanProjects()

    console.log(JSON.stringify(projects, null, 2))
    await fs.writeFile(
      'lib/projectIndex.json',
      JSON.stringify(projects),
      'utf-8'
    )

    console.log(
      `✓ Successfully built project index with ${Object.keys(projects).length} projects`
    )
  } catch (error) {
    console.error('Error building project index:', error)
    throw error
  }
}
