import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { FileReceived, FileSent } from '@renderer/types/Files'
import { Table } from '@tanstack/react-table'

export function Pagination<TTable extends FileReceived | FileSent>({
  table
}: {
  table: Table<TTable>
}) {
  return (
    <Box width="100%" textAlign="right">
      <span className="label-medium" style={{ paddingRight: '20px' }}>
        {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
      </span>
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        style={{ minWidth: '48px' }}
      >
        <ArrowBackIos sx={{ width: '20px', height: '20px' }} />
      </Button>
      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        style={{ minWidth: '48px' }}
      >
        <ArrowForwardIos sx={{ width: '20px', height: '20px' }} />
      </Button>
    </Box>
  )
}
