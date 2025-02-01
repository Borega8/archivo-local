import { Add, Delete } from '@mui/icons-material'
import { AlertMessage, ConfirmDialog, CustomFAB, ProgressBar } from '@renderer/components'
import { MainLayout } from '@renderer/layouts/MainLayout'
import { CreateSerieDialog } from './components'
import { Fragment, useState } from 'react'
import { useSeries } from '@renderer/modules/home/hooks/useSeries'
import { Divider, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useConfirmDialog } from '@renderer/hooks/useConfirmDialog'

export function Home() {
  const { data: series, isFetching, refetch: refetchSeries, error } = useSeries()
  const [open, setOpen] = useState(false)
  const [serie, setSerie] = useState<Serie>()
  const {
    open: isDialogOpen,
    onAccept,
    onClose,
    openDialog
  } = useConfirmDialog({ deleteFn: null, refetch: refetchSeries })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDialog = (serie: Serie) => {
    setSerie(serie)
    openDialog()
  }

  return (
    <MainLayout title="Inicio">
      <ConfirmDialog
        open={isDialogOpen}
        name={`${serie?.serie} ${serie?.titulo}`}
        onAccept={onAccept}
        onClose={onClose}
      />

      {series?.map((serie) => (
        <Fragment key={serie.serie_id}>
          <ListItem>
            <ListItemText primary={`${serie.serie} ${serie.titulo}`} />
            <ListItemIcon>
              <IconButton onClick={() => handleDialog(serie)}>
                <Delete sx={{ color: 'var(--md-sys-color-error)' }} />
              </IconButton>
            </ListItemIcon>
          </ListItem>
          <Divider />
        </Fragment>
      ))}

      <CreateSerieDialog open={open} handleClose={handleClose} refetchSeries={refetchSeries} />

      <CustomFAB onClick={handleClickOpen}>
        <Add />
      </CustomFAB>

      {isFetching && <ProgressBar />}
      {error && <AlertMessage isError message={error.message} />}
    </MainLayout>
  )
}
