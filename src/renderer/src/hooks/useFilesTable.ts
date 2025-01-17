import { FileReceived, FileSent } from '@renderer/types/Files'
import {
  SortingState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  ColumnFiltersState
} from '@tanstack/react-table'
import { useState } from 'react'

export function useFilesTable<TFiles extends FileReceived | FileSent>({
  files,
  columnDef,
  columnVisibitily
}: {
  files: TFiles[] | undefined
  columnDef: ColumnDef<TFiles, any>[]
  columnVisibitily: VisibilityState
}) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(columnVisibitily)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable<TFiles>({
    data: files ? files : [],
    columns: columnDef,
    getCoreRowModel: getCoreRowModel<TFiles[]>(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnVisibility,
      pagination,
      columnFilters
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters
  })

  return { table }
}
