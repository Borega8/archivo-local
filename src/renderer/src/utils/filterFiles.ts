import { dateFormatString } from '@renderer/constants/dateFormat'
import { Row } from '@tanstack/react-table'
import { formatDate } from 'date-fns'

export function filterFilesByDate<TFiles extends FileReceived | FileSent>(
  row: Row<TFiles>,
  columnId: string,
  filterValue: [Date, Date]
): boolean {
  if (!filterValue[0] || !filterValue[1]) return true

  const currentValue = row.getValue<string>(columnId)

  return (
    currentValue >= formatDate(filterValue[0], dateFormatString) &&
    currentValue <= formatDate(filterValue[1], dateFormatString)
  )
}
