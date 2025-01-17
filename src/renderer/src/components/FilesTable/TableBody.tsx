import { TFile } from '@renderer/types/Files'
import { Cell, Row, flexRender } from '@tanstack/react-table'
import { TableActions } from './TableActions'

export function TableBody({
  rows,
  type,
  handleOpen
}: {
  rows: Row<TFile>[]
  type: string
  handleOpen: (file) => void
}) {
  return (
    <tbody>
      {rows.map((row) => (
        <TableBodyRow key={row.id} row={row} type={type} handleOpen={handleOpen} />
      ))}
    </tbody>
  )
}

function TableBodyRow({
  row,
  type,
  handleOpen
}: {
  row: Row<TFile>
  type: string
  handleOpen: (file) => void
}) {
  return (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <TableBodyCell key={cell.id} cell={cell} type={type} handleOpen={handleOpen} />
      ))}
    </tr>
  )
}

function TableBodyCell({
  cell,
  type,
  handleOpen
}: {
  cell: Cell<TFile, unknown>
  type: string
  handleOpen: (file) => void
}) {
  return (
    <td key={cell.id}>
      {cell.id.includes('actions') ? (
        <TableActions cellData={cell.row.original} type={type} handleOpen={handleOpen} />
      ) : (
        flexRender(cell.column.columnDef.cell, cell.getContext())
      )}
    </td>
  )
}
