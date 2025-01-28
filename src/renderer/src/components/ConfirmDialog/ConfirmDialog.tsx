import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { CustomButton } from '@renderer/components'

export function ConfirmDialog({ open, name, onClose, onAccept }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>¿Deseas borrar {name}?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Todos los datos de {name} serán borrados definitivamente, esta acción no se puede revertir
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CustomButton variant="outlined" onClick={onClose}>
          Cancelar
        </CustomButton>
        <CustomButton variant="contained" onClick={onAccept}>
          Eliminar
        </CustomButton>
      </DialogActions>
    </Dialog>
  )
}
