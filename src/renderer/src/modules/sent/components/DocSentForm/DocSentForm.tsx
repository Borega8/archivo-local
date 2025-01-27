import { DatePicker } from '@mui/x-date-pickers'
import {
  AlertMessage,
  CustomTextField,
  FormActions,
  ProgressBar,
  InputFileField
} from '@renderer/components'
import { FileSent, TFile } from '@renderer/types/Files'
import { useFileUpload } from '@hooks/useFileUpload'
import { FileType } from '@renderer/constants/file'

export function DocSentForm({
  file,
  onSubmit
}: {
  file?: FileSent
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<TFile>
}) {
  const { isError, errorUploadFile, isPending, showAlert, uploadFile } = useFileUpload()

  return (
    <form onSubmit={onSubmit ? onSubmit : uploadFile} encType="multipart/form-data">
      <input type="hidden" name="type" value={FileType.SENT} />
      <CustomTextField
        label="Nombre del archivo"
        variant="outlined"
        name="fileName"
        defaultValue={file?.nombre}
        required
        autoFocus
      />
      <CustomTextField
        label="Dependencia"
        variant="outlined"
        name="dependency"
        defaultValue={file?.dependencia}
      />
      <CustomTextField
        label="No. de Oficio"
        variant="outlined"
        name="noFile"
        defaultValue={file?.no_oficio}
      />
      <CustomTextField
        label="Asunto"
        variant="outlined"
        name="subject"
        defaultValue={file?.asunto}
      />
      <DatePicker
        label="Fecha del Oficio"
        sx={{ minWidth: '420px' }}
        name="dateFile"
        defaultValue={file?.fecha_oficio ? new Date(file.fecha_oficio) : null}
      />
      <CustomTextField label="Dirigido a" variant="outlined" name="to" defaultValue={file?.para} />
      <CustomTextField label="Con at'n a" variant="outlined" name="atn" defaultValue={file?.atn} />
      <CustomTextField
        label="Firma"
        variant="outlined"
        name="whoSigns"
        defaultValue={file?.quien_firma}
      />
      <CustomTextField
        label="Elaboró"
        variant="outlined"
        name="createdBy"
        defaultValue={file?.quien_elaboro}
      />
      <DatePicker
        label="Fecha de envío y recepción"
        sx={{ minWidth: '420px' }}
        name="dateReceived"
        defaultValue={file?.fecha_recibido ? new Date(file.fecha_recibido) : null}
      />
      <CustomTextField
        label="Quién recibe"
        variant="outlined"
        name="whoReceived"
        defaultValue={file?.quien_recibe}
      />
      <CustomTextField
        label="Estatus"
        variant="outlined"
        name="status"
        defaultValue={file?.estado}
      />
      <CustomTextField
        label="Código de clasificación archivística"
        variant="outlined"
        name="serieCode"
        defaultValue={file?.codigo_clasificacion}
        required
      />
      <CustomTextField
        label="Ubicación"
        variant="outlined"
        name="location"
        defaultValue={file?.ubicacion}
      />
      <CustomTextField
        label="Observaciones"
        variant="outlined"
        name="observations"
        defaultValue={file?.observaciones}
      />

      <InputFileField label={file?.nombre} />

      <FormActions />

      {isPending ? <ProgressBar /> : <></>}
      {showAlert && (
        <AlertMessage
          isError={isError}
          message={errorUploadFile ? errorUploadFile.message : 'Archivo subido correctamente'}
        />
      )}
    </form>
  )
}
