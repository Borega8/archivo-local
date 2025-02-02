import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { AlertMessage, CustomButton, CustomTextField, ProgressBar } from '@renderer/components'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { useAddAutocomplete } from '@renderer/modules/config/hooks/useAddAutocomplete'
import { fieldsArray } from '@renderer/constants/fieldsAutocomplete'

type CreateAutocompleteDialogProps = {
  open: boolean
  handleClose: () => void
  refetchFieldValues: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<FieldValue[], Error>>
}

export function CreateAutocompleteDialog({
  open,
  handleClose,
  refetchFieldValues
}: CreateAutocompleteDialogProps) {
  const { onSubmit, isPending, error, showAlert } = useAddAutocomplete({ refetchFieldValues })

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit
      }}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>Registrar nuevo valor</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}
      >
        <FormControl sx={{ minWidth: '420px', marginTop: '8px' }}>
          <InputLabel id="label-series">Campo</InputLabel>
          <Select label="Campo" name="field" defaultValue={fieldsArray[0]} required>
            {fieldsArray.map((field, index) => (
              <MenuItem value={`${field}`} key={index}>
                {field}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <CustomTextField label="Valor" name="value" sx={{ marginTop: '8px' }} required />
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
