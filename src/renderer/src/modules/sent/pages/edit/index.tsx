import { CustomAlert, ProgressBar } from '@renderer/components'
import { FileType } from '@renderer/constants/file'
import { useEditFile } from '@renderer/hooks/useEditFile'
import { useGetFile } from '@renderer/hooks/useGetFile'
import { MainLayout } from '@renderer/layouts/MainLayout'
import { DocSentForm } from '@renderer/modules/sent/components'
import { FileSent } from '@renderer/types/Files'
import { useParams } from 'react-router-dom'

export function EditSent() {
  const { id } = useParams()
  const { data, isFetching, error } = useGetFile(Number(id), FileType.SENT)
  const {
    isPending,
    onSubmit,
    showAlert,
    error: errorEdit
  } = useEditFile(Number(id), FileType.SENT)

  return (
    <MainLayout title="Editar documento">
      <h3 className="title-large">Datos del archivo</h3>
      {data && <DocSentForm file={data as FileSent} onSubmit={onSubmit} />}

      {(isPending || isFetching) && <ProgressBar />}
      {error && <CustomAlert text={error.message} severity="error" />}
      {showAlert && !errorEdit && <CustomAlert text="Archivo actualizado correctamente" />}
      {showAlert && errorEdit && <CustomAlert text={errorEdit.message} severity="error" />}
    </MainLayout>
  )
}
