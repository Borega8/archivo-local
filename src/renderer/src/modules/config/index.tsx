import { MainLayout } from '@renderer/layouts/MainLayout'
import { CreateAutocompleteDialog } from './components'
import { Fragment, useState } from 'react'
import { AlertMessage, ConfirmDialog, CustomFAB, ProgressBar } from '@renderer/components'
import { Add, Delete } from '@mui/icons-material'
import { useGetAutocomplete } from '@renderer/hooks/useGetAutocomplete'
import { Divider, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useConfirmDialog } from '@renderer/hooks/useConfirmDialog'
import { useDeleteAutocomplete } from './hooks/useDeleteAutocomplete'

export default function Config() {
  const { data: fields, refetch, isFetching, failureReason } = useGetAutocomplete()
  const [open, setOpen] = useState(false)
  const [fieldValue, setFieldValue] = useState<FieldValue>()
  const {
    mutateAsync: deleteFieldValue,
    isPending,
    error,
    showAlert
  } = useDeleteAutocomplete(fieldValue ? fieldValue.autocompletado_id : 0)
  const {
    open: isDialogOpen,
    onAccept,
    onClose,
    openDialog
  } = useConfirmDialog({ deleteFn: deleteFieldValue, refetch })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDialog = (fieldValue: FieldValue) => {
    setFieldValue(fieldValue)
    openDialog()
  }

  return (
    <MainLayout title="Autocompletado">
      <ConfirmDialog
        open={isDialogOpen}
        name={`${fieldValue?.valor}`}
        onAccept={onAccept}
        onClose={onClose}
      />

      <CreateAutocompleteDialog
        open={open}
        handleClose={handleClose}
        refetchFieldValues={refetch}
      />

      {fields?.map((field) => (
        <Fragment key={field.autocompletado_id}>
          <ListItem>
            <ListItemText
              primary={
                <p>
                  <strong>{field.campo} - </strong>
                  {field.valor}
                </p>
              }
            />
            <ListItemIcon>
              <IconButton onClick={() => handleDialog(field)}>
                <Delete sx={{ color: 'var(--md-sys-color-error)' }} />
              </IconButton>
            </ListItemIcon>
          </ListItem>
          <Divider />
        </Fragment>
      ))}

      <CustomFAB onClick={handleClickOpen}>
        <Add />
      </CustomFAB>

      {(isFetching || isPending) && <ProgressBar />}
      {showAlert && error && <AlertMessage isError message={error.message} />}
      {failureReason && <AlertMessage isError message={failureReason.message} />}
    </MainLayout>
  )
}
