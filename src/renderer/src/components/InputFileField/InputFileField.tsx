import './InputFileField.css'
import { BaseSyntheticEvent } from 'react'
import { getFilesSelected } from '@renderer/utils/getFilesSelected'
import { UploadFileOutlined } from '@mui/icons-material'

export function InputFileField({ label = 'Seleccionar archivo' }: { label?: string }) {
  const handleFilesSelected = (e: BaseSyntheticEvent) => {
    e.preventDefault()

    const files: FileList = e.target.files
    e.target.nextElementSibling.innerHTML = getFilesSelected(files)
  }

  return (
    <>
      <input
        type="file"
        name="file"
        id="file"
        className="input-file"
        onChange={handleFilesSelected}
        multiple
      />
      <label htmlFor="file" className="file-label label-large">
        <UploadFileOutlined />
        {label}
      </label>
    </>
  )
}
