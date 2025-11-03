'use client'

import {ColumnDef} from '@tanstack/react-table'
import {Project} from '@/lib/types'
import {DataTable} from '@/components/ui/data-table'
import {getProjects} from '@/lib/projects'
import {useMemo} from 'react'
import {useTolgee, useTranslate} from '@tolgee/react'
import {getDateFunctions} from '@/lib/dates'
import {LOCALES} from '@/locales'
import {Button} from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {
  ProjectContextMap,
  ProjectTechnologyBadge
} from '@/components/ui/project-badges'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import DownloadPDFButton from '@/components/pdf/download-button'

export default function ProjectsTable() {
  const router = useRouter()
  const tolgee = useTolgee()
  const locale = tolgee.getLanguage() || LOCALES.de
  const {format} = getDateFunctions(locale)
  const {t} = useTranslate('portfolio')
  const columns: ColumnDef<Project>[] = [
    {
      header: () => t('name', {ns: 'common'}),
      id: 'name',
      accessorFn: row => row.name?.[locale as keyof typeof row.name] || '',
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({row}) => {
        return (
          <div>
            {row.original.name?.[locale as keyof typeof row.original.name]}
          </div>
        )
      }
    },
    {
      header: () => t('technologies'),
      id: 'technologies',
      accessorFn: row => row.technologies.join(', '),
      enableSorting: false,
      enableGlobalFilter: true,
      cell: ({row}) => {
        return (
          <div className="flex gap-2 flex-wrap">
            {row.original.technologies.map(technology => (
              <ProjectTechnologyBadge
                key={technology}
                technologyName={technology}
              />
            ))}
          </div>
        )
      }
    },
    {
      header: () => t('context'),
      accessorKey: 'context',
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({row}) => {
        return <ProjectContextMap context={row.original.context} t={t} />
      }
    },
    {
      header: () => t('start', {ns: 'common'}),
      id: 'start',
      accessorFn: row => format(row.start, 'MMMM yyyy'),
      enableSorting: true,
      enableGlobalFilter: true,
      sortingFn: (rowA, rowB) => {
        return rowA.original.start.getTime() - rowB.original.start.getTime()
      },
      cell: ({row}) => {
        return <div>{format(row.original.start, 'MMMM yyyy')}</div>
      }
    },
    {
      header: () => t('end', {ns: 'common'}),
      id: 'end',
      accessorFn: row => (row.end ? format(row.end, 'MMMM yyyy') : 'N/A'),
      enableSorting: true,
      enableGlobalFilter: true,
      sortingFn: (rowA, rowB) => {
        const endA = rowA.original.end?.getTime() || 0
        const endB = rowB.original.end?.getTime() || 0
        return endA - endB
      },
      cell: ({row}) => {
        if (!row.original.end) return <div>N/A</div>
        return <div>{format(row.original.end, 'MMMM yyyy')}</div>
      }
    },
    {
      id: 'actions',
      enableHiding: false,
      enableSorting: false,
      enableGlobalFilter: false,
      cell: ({row}) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icon name="ellipsis" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-popover" align="end">
              <DropdownMenuItem asChild>
                <Link href={`/portfolio/projects/${row.original.id}`}>
                  <Icon name="eye" />
                  {t('viewProjectRef', {ns: 'portfolio'})}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={e => {
                  e.preventDefault()
                }}>
                <DownloadPDFButton
                  className="font-inter font-normal focus-visible:ring-0 p-0 h-auto"
                  variant="ghost"
                  file="project"
                  projectid={row.original.id}
                  label={t('downloadProjectRef', {ns: 'portfolio'})}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  const projects = useMemo(() => getProjects(), [locale])

  const handleRowClick = (project: Project) => {
    router.push(`/portfolio/projects/${project.id}`)
  }

  return (
    <DataTable columns={columns} data={projects} onRowClick={handleRowClick} />
  )
}
