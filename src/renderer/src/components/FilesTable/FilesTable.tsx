import { Table } from '@tanstack/react-table'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'

export function FilesTable({
  table,
  type,
  handleOpen
}: {
  table: Table<any>
  type: string
  handleOpen?: any
}) {
  return (
    <table>
      <TableHeader headerGroups={table.getHeaderGroups()} />
      <TableBody rows={table.getRowModel().rows} type={type} handleOpen={handleOpen} />
    </table>
  )
}
