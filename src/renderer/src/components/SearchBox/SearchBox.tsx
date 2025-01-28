import { Search, Tune } from '@mui/icons-material'
import { Box, IconButton, InputBase } from '@mui/material'
import { CustomAlert, CustomButton } from '@renderer/components'
import { FileType } from '@renderer/constants/file'
import { FileReceived, FileSent } from '@renderer/types/Files'
import { Table } from '@tanstack/react-table'
import { useState } from 'react'

export function SearchBox<TTable extends FileReceived | FileSent>({
  table,
  type,
  year,
  openSideSheetFilters
}: {
  table: Table<TTable>
  type: FileType
  year: number
  openSideSheetFilters: () => void
}) {
  const [exported, setExported] = useState<[boolean, string]>([false, ''])

  window.electron.ipcRenderer.on('exported', (_, res) => {
    setExported([true, res])

    setTimeout(() => {
      setExported([false, ''])
    }, 5000)
  })

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'static'
      }}
    >
      <Box
        sx={{
          width: '400px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          margin: '20px',
          padding: '4px',
          backgroundColor: 'var(--md-sys-color-surface-container-high)',
          borderRadius: '28px',
          border: 'none',
          position: 'static'
        }}
      >
        <IconButton
          type="button"
          sx={{ p: '10px', color: 'var(--md-sys-color-on-surface-variant)' }}
          aria-label="search"
        >
          <Search />
        </IconButton>
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            color: 'var(--md-sys-color-on-surface-variant)',
            width: '100%',
            height: '100%'
          }}
          placeholder="Buscar..."
          className="body-large"
          value={table.getState().globalFilter}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
        />
        <IconButton
          type="button"
          sx={{ p: '10px', color: 'var(--md-sys-color-on-surface-variant)' }}
          aria-label="filters"
          onClick={openSideSheetFilters}
        >
          <Tune />
        </IconButton>
      </Box>
      <CustomButton
        variant="outlined"
        onClick={() => window.electron.ipcRenderer.send('export', [type, year])}
      >
        Exportar a Excel
      </CustomButton>

      {exported[0] && <CustomAlert text={`Archivo ${exported[1]} creado`} />}
    </Box>
  )
}
