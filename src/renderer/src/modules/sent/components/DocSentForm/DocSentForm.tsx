import { DatePicker } from '@mui/x-date-pickers'
import {
  AlertMessage,
  CustomTextField,
  FormActions,
  ProgressBar,
  InputFileField
} from '@renderer/components'
import { useFileUpload } from '@hooks/useFileUpload'
import { FileType } from '@renderer/constants/file'
import { useSeries } from '@renderer/hooks/useSeries'
import { Autocomplete, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useGetAutocomplete } from '@renderer/hooks/useGetAutocomplete'
import { Fields } from '@renderer/constants/fieldsAutocomplete'

export function DocSentForm({
  file,
  onSubmit
}: {
  file?: FileSent
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<TFile>
}) {
  const { isError, errorUploadFile, isPending, showAlert, uploadFile } = useFileUpload()
  const { data: series } = useSeries()
  const { data: fields } = useGetAutocomplete()

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
      <Autocomplete
        freeSolo
        defaultValue={file?.dependencia}
        options={
          fields
            ?.filter((field) => field.campo === Fields.dependency)
            .map((f) => f.valor.toString()) || ['']
        }
        renderInput={(params) => (
          <CustomTextField {...params} label="Dependencia" name="dependency" />
        )}
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
      <Autocomplete
        freeSolo
        defaultValue={file?.para}
        options={
          fields?.filter((field) => field.campo === Fields.to).map((f) => f.valor.toString()) || [
            ''
          ]
        }
        renderInput={(params) => <CustomTextField {...params} label="Dirigido a" name="to" />}
      />
      <Autocomplete
        freeSolo
        defaultValue={file?.atn}
        options={
          fields?.filter((field) => field.campo === Fields.atn).map((f) => f.valor.toString()) || [
            ''
          ]
        }
        renderInput={(params) => <CustomTextField {...params} label="Con at'n a" name="atn" />}
      />
      <Autocomplete
        freeSolo
        defaultValue={file?.quien_firma}
        options={
          fields
            ?.filter((field) => field.campo === Fields.whoSigns)
            .map((f) => f.valor.toString()) || ['']
        }
        renderInput={(params) => <CustomTextField {...params} label="Firma" name="whoSigns" />}
      />
      <Autocomplete
        freeSolo
        defaultValue={file?.quien_elaboro}
        options={
          fields
            ?.filter((field) => field.campo === Fields.createdBy)
            .map((f) => f.valor.toString()) || ['']
        }
        renderInput={(params) => <CustomTextField {...params} label="Elaboró" name="createdBy" />}
      />
      <DatePicker
        label="Fecha de envío"
        sx={{ minWidth: '420px' }}
        name="dateSent"
        defaultValue={file?.fecha_enviado ? new Date(file.fecha_enviado) : null}
      />
      <DatePicker
        label="Fecha de recepción"
        sx={{ minWidth: '420px' }}
        name="dateReceived"
        defaultValue={file?.fecha_recibido ? new Date(file.fecha_recibido) : null}
      />
      <Autocomplete
        freeSolo
        defaultValue={file?.quien_recibe}
        options={
          fields
            ?.filter((field) => field.campo === Fields.whoReceived)
            .map((f) => f.valor.toString()) || ['']
        }
        renderInput={(params) => (
          <CustomTextField {...params} label="Quién recibe" name="whoReceived" />
        )}
      />
      <Autocomplete
        freeSolo
        defaultValue={file?.estado}
        options={
          fields
            ?.filter((field) => field.campo === Fields.status)
            .map((f) => f.valor.toString()) || ['']
        }
        renderInput={(params) => <CustomTextField {...params} label="Estatus" name="status" />}
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
      <Autocomplete
        freeSolo
        defaultValue={file?.ubicacion}
        options={
          fields
            ?.filter((field) => field.campo === Fields.location)
            .map((f) => f.valor.toString()) || ['']
        }
        renderInput={(params) => <CustomTextField {...params} label="Ubicación" name="location" />}
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
