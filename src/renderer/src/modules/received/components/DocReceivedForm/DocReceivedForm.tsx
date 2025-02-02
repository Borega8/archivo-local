import { DatePicker } from '@mui/x-date-pickers'
import {
  AlertMessage,
  CustomTextField,
  FormActions,
  ProgressBar,
  InputFileField
} from '@renderer/components'
import { useFileUpload } from '@renderer/hooks/useFileUpload'
import { FileType } from '@renderer/constants/file'
import { useSeries } from '@renderer/hooks/useSeries'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export function DocReceivedForm({
  file,
  onSubmit
}: {
  file?: FileReceived
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<TFile>
}) {
  const { errorUploadFile, isError, isPending, showAlert, uploadFile } = useFileUpload()
  const { data: series } = useSeries()

  return (
    <form onSubmit={onSubmit ? onSubmit : uploadFile} encType="multipart/form-data">
      <input type="hidden" name="type" value={FileType.RECEIVED} />
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
        label="Quién recibe"
        variant="outlined"
        name="whoReceived"
        defaultValue={file?.quien_recibe}
      />
      <DatePicker
        label="Fecha de Recepción"
        sx={{ minWidth: '420px' }}
        name="dateReceived"
        defaultValue={file?.fecha_recibido ? new Date(file.fecha_recibido) : null}
      />
      <CustomTextField
        label="Turnado"
        variant="outlined"
        name="turn"
        defaultValue={file?.turnado}
      />
      <CustomTextField
        label="Estatus"
        variant="outlined"
        name="status"
        defaultValue={file?.estado}
      />
      <FormControl sx={{ minWidth: '420px' }}>
        <InputLabel id="label-series">Código de clasificación archivística</InputLabel>
        <Select
          labelId="label-series"
          label="Código de clasificación archivística"
          name="serieCode"
          defaultValue={file?.codigo_clasificacion}
          required
        >
          {series?.map((serie) => (
            <MenuItem value={`${serie.serie} ${serie.titulo}`} key={serie.serie}>
              {serie.serie} {serie.titulo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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

      {isPending && <ProgressBar />}
      {showAlert && (
        <AlertMessage
          isError={isError}
          message={errorUploadFile ? errorUploadFile.message : 'Archivo subido correctamente'}
        />
      )}
    </form>
  )
}
