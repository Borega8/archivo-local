import { AlertMessage, FilesTable, NavigationFAB, ProgressBar } from '@renderer/components'
import { FileType } from '@renderer/constants/file'
import { AppRoutesEnum } from '@renderer/constants/routes'
import { columnsFileReceived } from '@renderer/constants/tableColumns'
import { useFilesTable } from '@renderer/hooks/useFilesTable'
import { useGetFiles } from '@renderer/hooks/useGetFiles'
import { ContentScrollableLayout } from '@renderer/layouts/ContentScrollableLayout'
import { MainLayout } from '@renderer/layouts/MainLayout'

export function Sent() {
  const { data: files, isFetching, isPending, error } = useGetFiles(FileType.SENT)

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
      ['created_by']: true,
      ['who_received']: true,
      ['date_received']: true,
      ['status']: true,
      ['serie_code']: true,
      ['location']: true,
      ['observations']: true
    }
  })

  return (
    <MainLayout title="Documentos de salida">
      <ContentScrollableLayout>
        <FilesTable table={table} type={FileType.SENT} handleOpen={null} />
      </ContentScrollableLayout>

      <NavigationFAB to={AppRoutesEnum.NEW_SENT} />

      {(isFetching || isPending) && <ProgressBar />}
      {error && <AlertMessage message={error.message} isError />}
    </MainLayout>
  )
}
