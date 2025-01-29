import { Header, HeaderGroup, flexRender } from '@tanstack/react-table'
import { SwapVert } from '@mui/icons-material'

export function TableHeader<T extends TFile>({ headerGroups }: { headerGroups: HeaderGroup<T>[] }) {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <TableHeaderRow key={headerGroup.id} headers={headerGroup.headers} />
      ))}
    </thead>
  )
}

function TableHeaderRow<T extends TFile>({ headers }: { headers: Header<T, unknown>[] }) {
  return (
    <tr>
      {headers.map((header) => (
        <TableHeaderColumn key={header.id} header={header} />
      ))}
    </tr>
  )
}

function TableHeaderColumn<T extends TFile>({ header }: { header: Header<T, unknown> }) {
  return (
    <th
      key={header.id}
      onClick={header.column.getToggleSortingHandler()}
      className="label-medium-prominent"
      style={{
        minWidth: `${header.getSize()}px`
      }}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
      <SwapVert sx={{ width: '16px' }} />
      {{ asc: 'A', desc: 'D' }[header.column.getIsSorted() ? header.column.getSortIndex() : -1]}
    </th>
  )
}
