import { Add } from '@mui/icons-material'
import { AlertMessage, CustomFAB, ProgressBar } from '@renderer/components'
import { MainLayout } from '@renderer/layouts/MainLayout'
import { CreateSerieDialog } from './components'
import { Fragment, useState } from 'react'
import { useSeries } from '@renderer/modules/home/hooks/useSeries'
import { Divider, ListItem, ListItemText } from '@mui/material'

export function Home() {
  const { data: series, isFetching, refetch: refetchSeries, error } = useSeries()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <MainLayout title="Inicio">
      {series?.map((serie) => (
        <Fragment key={serie.serie_id}>
          <ListItem>
            <ListItemText primary={`${serie.serie} ${serie.titulo}`} />
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
