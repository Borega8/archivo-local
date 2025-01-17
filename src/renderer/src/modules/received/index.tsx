import { FilesTable, ProgressBar } from '@renderer/components'
import { FileType } from '@renderer/constants/file'
import { columnsFileReceived } from '@renderer/constants/tableColumns'
import { useFilesTable } from '@renderer/hooks/useFilesTable'
import { useGetFiles } from '@renderer/hooks/useGetFiles'
import { ContentScrollableLayout } from '@renderer/layouts/ContentScrollableLayout'
import { MainLayout } from '@renderer/layouts/MainLayout'

export function Received() {
  const { data: files, isFetching, isPending, error } = useGetFiles(FileType.RECEIVED)

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

  return (
    <MainLayout title="Documentos de entrada">
      <ContentScrollableLayout>
        <FilesTable table={table} type={FileType.RECEIVED} handleOpen={null} />
      </ContentScrollableLayout>

      {(isFetching || isPending) && <ProgressBar />}
    </MainLayout>
  )
}
