import { FilesTable } from '@renderer/components'
import { FileType } from '@renderer/constants/file'
import { SERVER_URL } from '@renderer/constants/routes'
import { columnsFileReceived } from '@renderer/constants/tableColumns'
import { useFilesTable } from '@renderer/hooks/useFilesTable'
import { ContentScrollableLayout } from '@renderer/layouts/ContentScrollableLayout'
import { MainLayout } from '@renderer/layouts/MainLayout'
import { useQuery } from '@tanstack/react-query'

const getFiles = async (fileType: FileType) => {
  const response = await fetch(`${SERVER_URL}/files?type=${fileType}`)
  const data = await response.json()

  if (data.error) throw new Error(data.error)

  return data
}

export function useGetFiles(fileType: FileType) {
  return useQuery({
    queryKey: ['files', fileType],
    queryFn: () => getFiles(fileType)
  })
}

export function Received() {
  const { data: files, isLoading, error } = useGetFiles(FileType.RECEIVED)

  isLoading && <h3>Locading...</h3>
  error && <h3>{error.message}</h3>

  const { table } = useFilesTable({
    files,
    columnDef: columnsFileReceived,
    columnVisibitily: {
      ['name']: true,
      ['dependency']: true,
      ['no_file']: true,
      ['subject']: true,
      ['date_file']: true,
      ['to']: true,
      ['atn']: true,
      ['who_signs']: true,
      ['who_received']: true,
      ['date_received']: true,
      ['turn']: true,
      ['status']: true,
      ['serie_code']: true,
      ['location']: true,
      ['observations']: true
    }
  })

  console.log(files)

  return (
    <MainLayout title="Documentos de entrada">
      <ContentScrollableLayout>
        <FilesTable table={table} type="received" handleOpen={null} />
      </ContentScrollableLayout>
    </MainLayout>
  )
}
