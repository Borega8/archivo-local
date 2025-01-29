import { Close, Done } from '@mui/icons-material'
import { Box, Chip, MenuItem, Select, SwipeableDrawer } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { CustomButton } from '@renderer/components'
import { FileType } from '@renderer/constants/file'
import { useYears } from '@renderer/hooks/useYears'
import { Column, Table } from '@tanstack/react-table'

export function SideSheetFilters<T extends FileReceived | FileSent>({
  open,
  table,
  yearValue,
  fileType,
  handleClose,
  handleOpen,
  setYearValue
}: {
  open: boolean
  table: Table<T>
  yearValue: number
  fileType: FileType
  setYearValue: (year: number) => void
  handleClose: () => void
  handleOpen: () => void
}) {
  const column = table.getColumn('fecha_oficio')
  const { data: years } = useYears(fileType)

  return (
    <SwipeableDrawer anchor="right" open={open} onClose={handleClose} onOpen={handleOpen}>
      <Box
        sx={{
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          padding: '12px 24px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <h3 className="title-large">Filtros</h3>
          <span onClick={handleClose} style={{ cursor: 'pointer' }}>
            <Close />
          </span>
        </Box>

        <ColumnsVisibitily columns={table.getAllColumns()} />

        <SelectRowsNumber table={table} />

        <SelectYearFiles years={years} yearValue={yearValue} setYearValue={setYearValue} />

        <SelectDateRange column={column} />
      </Box>
    </SwipeableDrawer>
  )
}

function ColumnsVisibitily<TColumn extends FileReceived | FileSent>({
  columns
}: {
  columns: Column<TColumn>[]
}) {
  return (
    <Box>
      <h4 className="title-medium">Columnas</h4>
      {columns.map((column) => (
        <Chip
          label={`${column.columnDef.header}`}
          key={column.id}
          icon={column.getIsVisible() ? <Done /> : <Close />}
          color={column.getIsVisible() ? 'secondary' : 'default'}
          variant={column.getIsVisible() ? 'filled' : 'outlined'}
          sx={{ borderRadius: '8px', marginRight: '8px', marginBottom: '8px' }}
          onClick={() => {
            column.toggleVisibility(!column.getIsVisible())
          }}
        />
      ))}
    </Box>
  )
}

function SelectRowsNumber<TTable extends FileReceived | FileSent>({
  table
}: {
  table: Table<TTable>
}) {
  return (
    <Box>
      <h4 className="title-medium">Registros por página</h4>
      <Select
        value={table.getState().pagination.pageSize}
        onChange={(e) => table.setPageSize(Number(e.target.value))}
      >
        <MenuItem value={table.getRowCount()}>Todos</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={75}>75</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    </Box>
  )
}

function SelectYearFiles({
  years,
  yearValue,
  setYearValue
}: {
  years: number[] | undefined
  yearValue: number
  setYearValue: (year: number) => void
}) {
  return (
    <Box>
      <h4 className="title-medium">Año</h4>
      <Select
        value={yearValue}
        onChange={(e) => {
          setYearValue(Number(e.target.value))
        }}
      >
        {years?.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

function SelectDateRange<TColumn extends FileReceived | FileSent>({
  column
}: {
  column: Column<TColumn> | undefined
}) {
  const filterV = column?.getFilterValue()

  return (
    <Box>
      <h4 className="title-medium">Fechas</h4>
      <Box sx={{ display: 'flex', gap: '8px', paddingTop: '10px' }}>
        <DatePicker
          label="Fecha inicio"
          name="initialDate"
          value={(filterV as [Date, Date])?.[0] ?? null}
          onChange={(date) => column?.setFilterValue((old: [Date, Date]) => [date, old?.[1]])}
        />
        <DatePicker
          label="Fecha límite"
          name="endDate"
          value={(filterV as [Date, Date])?.[1] ?? null}
          onChange={(date) => column?.setFilterValue((old: [Date, Date]) => [old?.[0], date])}
        />
      </Box>
      <CustomButton
        variant="outlined"
        sx={{ marginTop: '10px' }}
        onClick={() => column?.setFilterValue([null, null])}
      >
        Resetear fechas
      </CustomButton>
    </Box>
  )
}
