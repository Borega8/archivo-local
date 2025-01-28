import { useState } from 'react'

export function useConfirmDialog({ deleteFn, refetch }) {
  const [open, setOpen] = useState(false)

  const onClose = () => {
    setOpen(false)
  }

  const openDialog = () => {
    setOpen(true)
  }

  const onAccept = async () => {
    await deleteFn()
    await refetch()
    onClose()
  }

  return { open, onClose, openDialog, onAccept }
}
