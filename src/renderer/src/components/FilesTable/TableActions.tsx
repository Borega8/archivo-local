import { Delete, Edit, OpenInNew } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { FileType } from '@renderer/constants/file'
import { AppRoutesEnum } from '@renderer/constants/routes'
import { useNavigate } from 'react-router-dom'

export function TableActions({
  cellData,
  type,
  handleOpen
}: {
  cellData: TFile
  type: FileType
  handleOpen: (file) => void
}) {
  return (
    <span style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <TableActionDelete
        document_id={cellData.documento_id}
        handleOpen={() => handleOpen(cellData)}
      />
      <TableActionEdit document_id={cellData.documento_id} type={type} />
      <TableActionOpen url={cellData.file_path} />
    </span>
  )
}

function TableActionDelete({
  document_id,
  handleOpen
}: {
  document_id: number
  handleOpen: (fileId: number) => void
}) {
  return (
    <IconButton onClick={() => handleOpen(document_id)}>
      <Delete sx={{ color: 'var(--md-sys-color-error)' }} />
    </IconButton>
  )
}

function TableActionEdit({ document_id, type }: { document_id: number; type: FileType }) {
  const navigate = useNavigate()

  return (
    <IconButton
      onClick={() =>
        type === FileType.RECEIVED
          ? navigate(`${AppRoutesEnum.RECEIVED}/${document_id}`)
          : navigate(`${AppRoutesEnum.SENT}/${document_id}`)
      }
    >
      <Edit sx={{ color: 'blue' }} />
    </IconButton>
  )
}

function TableActionOpen({ url }: { url: string }) {
  return (
    <IconButton
      onClick={() => {
        window.electron.ipcRenderer.send('open-file', url)
      }}
    >
      <OpenInNew sx={{ color: 'var(--md-sys-color-scrim)' }} />
    </IconButton>
  )
}
