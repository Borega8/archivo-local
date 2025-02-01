import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { AlertMessage, CustomButton, CustomTextField, ProgressBar } from '@renderer/components'
import { useAddSerie } from '@renderer/modules/home/hooks/useAddSerie'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

type CreateSerieDialogProps = {
  open: boolean
  handleClose: () => void
  refetchSeries: (options?: RefetchOptions) => Promise<QueryObserverResult<Serie[], Error>>
}

export function CreateSerieDialog({ open, handleClose, refetchSeries }: CreateSerieDialogProps) {
  const { onSubmit, isPending, error, showAlert } = useAddSerie({ refetchSeries })

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit
      }}
    >
      <DialogTitle>Registrar nueva serie</DialogTitle>
      <DialogContent>
        <CustomTextField
          label="Código de clasificación archivística"
          name="serie"
          sx={{ marginTop: '8px' }}
        />
      </DialogContent>
      <DialogActions>
        <CustomButton variant="outlined" onClick={handleClose}>
          Cancelar
        </CustomButton>
        <CustomButton variant="contained" type="submit">
          Agregar
        </CustomButton>
      </DialogActions>

      {isPending && <ProgressBar />}
      {showAlert && error && <AlertMessage isError message={error.message} />}
    </Dialog>
  )
}
