'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {useState} from 'react'
import {Button} from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import {Input} from './input'
import {useTranslate} from '@tolgee/react'
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (row: TData) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const {t} = useTranslate('common')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
    state: {
      sorting,
      globalFilter
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end lg:w-[250px]">
        <Input
          className="border border-muted border-dashed shadow-none placeholder:text-sm placeholder:text-muted-foreground placeholder:font-light"
          placeholder={t('tableFilter')}
          value={globalFilter ?? ''}
          onChange={event => table.setGlobalFilter(event.target.value)}
        />
      </div>
      <div className="overflow-hidden rounded-md border border-muted border-dashed">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-2">
                          {header.column.getCanSort() ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="-ml-3 h-8 data-[state=open]:bg-accent hover:bg-transparent font-light text-sm gap-1"
                              onClick={() => header.column.toggleSorting()}>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {header.column.getIsSorted() === 'asc' ? (
                                <Icon name="sort-up" />
                              ) : header.column.getIsSorted() === 'desc' ? (
                                <Icon name="sort-down" />
                              ) : (
                                <Icon name="sort" className="opacity-40" />
                              )}
                            </Button>
                          ) : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                          )}
                        </div>
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={e => {
                    const target = e.target as HTMLElement
                    if (target.closest('a') || target.closest('button')) {
                      return
                    }
                    onRowClick?.(row.original)
                  }}
                  className={onRowClick ? 'cursor-pointer' : ''}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-8 text-sm text-muted-foreground">
          <span>
            {t('tablePagination', {
              currentPage: table.getState().pagination.pageIndex + 1,
              totalPages: table.getPageCount()
            })}
          </span>
          <span>
            {t('tablePaginationItems', {
              itemsPerPage: table.getPaginationRowModel().rows.length,
              totalItems: table.getRowCount()
            })}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <Icon name="chevron-left" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <Icon name="chevron-right" />
          </Button>
        </div>
      </div>
    </div>
  )
}
