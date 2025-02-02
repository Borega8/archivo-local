import { MainLayout } from '@renderer/layouts/MainLayout'
import { CreateAutocompleteDialog } from './components'
import { useState } from 'react'
import { CustomFAB } from '@renderer/components'
import { Add } from '@mui/icons-material'
import { useGetAutocomplete } from '@renderer/hooks/useGetAutocomplete'

export default function Config() {
  const { data, refetch } = useGetAutocomplete()
  const [open, setOpen] = useState(false)

  console.log(data)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <MainLayout title="Configuración">
      <CreateAutocompleteDialog
        open={open}
        handleClose={handleClose}
        refetchFieldValues={refetch}
      />

      <CustomFAB onClick={handleClickOpen}>
        <Add />
      </CustomFAB>
    </MainLayout>
  )
}
