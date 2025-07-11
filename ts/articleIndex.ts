import {LOCALES} from '@/locales'
import fs from 'fs/promises'
import path from 'path'
import {exec} from 'child_process'
import {promisify} from 'util'
import {serialize} from 'next-mdx-remote/serialize'
import {Article, ArticleIndex, MDXFrontmatter} from '@/lib/types'
import {IconName, IconPrefix} from '@/components/ui/icon'
import matter from 'gray-matter'

const articleDir = './articles'
const execAsync = promisify(exec)

async function getGitDates(
  filePath: string
): Promise<{createdAt: Date; updatedAt: Date}> {
  try {
    const {stdout: createStdout} = await execAsync(
      `git log --follow --format=%aI --reverse "${filePath}" | head -1`
    )

    const {stdout: updateStdout} = await execAsync(
      `git log -1 --format=%aI "${filePath}"`
    )

    return {
      createdAt: createStdout ? new Date(createStdout.trim()) : new Date(),
      updatedAt: updateStdout ? new Date(updateStdout.trim()) : new Date()
    }
  } catch {
    const now = new Date()
    return {createdAt: now, updatedAt: now}
  }
}

async function getGitAuthor(filePath: string): Promise<string> {
  try {
    const {stdout} = await execAsync(`git log -1 --format=%an "${filePath}"`)
    return stdout.trim() || 'Gino Naumann'
  } catch {
    return 'Gino Naumann'
  }
}

async function getMdxMetadata(filePath: string): Promise<MDXFrontmatter> {
  try {
    const source = await fs.readFile(filePath, 'utf-8')
    const {frontmatter} = await serialize(source, {
      parseFrontmatter: true
    })
    return {
      title:
        (frontmatter?.title as string) ||
        path.basename(filePath).replace(/\..*$/, ''),
      description: frontmatter?.description as string,
      icon: frontmatter?.icon as IconName,
      iconPrefix: frontmatter?.iconPrefix as IconPrefix,
      keywords: frontmatter?.keywords as string[],
      remoteRepo: frontmatter?.remoteRepo as string
    }
  } catch {
    return {
      title: path.basename(filePath).replace(/\..*$/, '')
    }
  }
}

async function getMdxContent(filePath: string): Promise<string> {
  try {
    const source = await fs.readFile(filePath, 'utf-8')
    const {content} = matter(source)
    return content
      .replace(/import\s+.*?\s+from\s+['"].*?['"]/g, '')
      .replace(/<([A-Z][A-Za-z]*)[^>]*>(.*?)<\/\1>/gs, '$2')
      .replace(/<[A-Z][A-Za-z]*[^>]*\/>/g, '')
      .replace(/^#+\s*/gm, '')
      .replace(/^>\s*/gm, '')
      .replace(/^[-*]\s*/gm, '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      .replace(/^\s*[\r\n]/gm, '')
      .trim()
  } catch {
    return ''
  }
}

async function scanDirectory(
  dir: string,
  locale: string,
  isRoot: boolean = true,
  parentPath: string = ''
): Promise<Article[]> {
  const entries = await fs.readdir(dir, {withFileTypes: true})
  const articles: Article[] = []
  let directoryArticle: Article | null = null

  const relativePath = path.relative(articleDir, dir)
  const currentPath = parentPath || relativePath

  if (!isRoot) {
    const indexFile = entries.find(
      entry => entry.name === `index.${locale}.mdx`
    )
    if (indexFile) {
      const indexPath = path.join(dir, `index.${locale}.mdx`)
      const dates = await getGitDates(indexPath)
      const {title, description, icon, iconPrefix, keywords, remoteRepo} =
        await getMdxMetadata(indexPath)
      directoryArticle = {
        slug: path.join(currentPath, 'index'),
        path: indexPath,
        title,
        description,
        icon,
        content: await getMdxContent(indexPath),
        iconPrefix,
        author: await getGitAuthor(indexPath),
        keywords,
        remoteRepo,
        ...dates
      }
    }
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      const children = await scanDirectory(
        fullPath,
        locale,
        false,
        path.join(currentPath, entry.name)
      )
      if (directoryArticle && children.length > 0) {
        const childDirArticle = children.find(a => a.slug.endsWith('/index'))
        if (childDirArticle) {
          directoryArticle.children = directoryArticle.children || []
          directoryArticle.children.push(childDirArticle)
          const filteredChildren = children.filter(a => a !== childDirArticle)
          articles.push(...filteredChildren)
        } else {
          articles.push(...children)
        }
      } else if (children.length > 0) {
        articles.push(...children)
      }
    } else if (
      entry.name.endsWith(`.${locale}.mdx`) &&
      (!directoryArticle || entry.name !== `index.${locale}.mdx`)
    ) {
      const baseName = entry.name.replace(`.${locale}.mdx`, '')
      const {title, description, icon, iconPrefix, keywords, remoteRepo} =
        await getMdxMetadata(fullPath)
      const article: Article = {
        slug: currentPath ? path.join(currentPath, baseName) : baseName,
        path: fullPath,
        title,
        description,
        keywords,
        icon,
        iconPrefix,
        remoteRepo,
        content: await getMdxContent(fullPath),
        author: await getGitAuthor(fullPath),
        ...(await getGitDates(fullPath))
      }

      if (directoryArticle && entry.name !== `index.${locale}.mdx`) {
        directoryArticle.children = directoryArticle.children || []
        directoryArticle.children.push(article)
      } else {
        articles.push(article)
      }
    }
  }

  if (directoryArticle) {
    articles.push(directoryArticle)
  }

  return articles
}

export const buildArticleIndex = async () => {
  const index = {} as ArticleIndex

  for (const locale of Object.keys(LOCALES)) {
    try {
      const articles = await scanDirectory(articleDir, locale)
      index[locale as keyof typeof LOCALES] = articles
    } catch {
      console.warn(`No articles for ${locale} found`)
      index[locale as keyof typeof LOCALES] = []
    }
  }

  console.log(JSON.stringify(index, null, 2))
  await fs.writeFile('lib/articleIndex.json', JSON.stringify(index), 'utf-8')
}
