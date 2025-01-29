import {
  AlertMessage,
  ConfirmDialog,
  FilesTable,
  NavigationFAB,
  ProgressBar,
  SearchBox,
  SideSheetFilters,
  Pagination
} from '@renderer/components'
import { FileType } from '@renderer/constants/file'
import { AppRoutesEnum } from '@renderer/constants/routes'
import { columnsFileReceived } from '@renderer/constants/tableColumns'
import { useConfirmDialog } from '@renderer/hooks/useConfirmDialog'
import { useDeleteFile } from '@renderer/hooks/useDeleteFile'
import { useFilesTable } from '@renderer/hooks/useFilesTable'
import { useShowFiltersSheet, useYearFilter } from '@renderer/hooks/useFilters'
import { useGetFiles } from '@renderer/hooks/useGetFiles'
import { ContentScrollableLayout } from '@renderer/layouts/ContentScrollableLayout'
import { MainLayout } from '@renderer/layouts/MainLayout'
import { useState } from 'react'

export function Received() {
  const { year, changeYear } = useYearFilter()

  const {
    data: files,
    isFetching,
    isPending,
    error,
    refetch: refetchFiles
  } = useGetFiles(FileType.RECEIVED, year)

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

  const { open, handleOpen, handleClose } = useShowFiltersSheet({ refetchFiles })

  const [file, setFile] = useState<FileReceived>()
  const {
    deleteFile,
    isPending: isDeletePending,
    errorDeleteFile,
    showAlert
  } = useDeleteFile(file ? file.documento_id : 0, FileType.RECEIVED)

  const {
    open: isDialogOpen,
    onAccept,
    onClose,
    openDialog
  } = useConfirmDialog({
    deleteFn: deleteFile,
    refetch: refetchFiles
  })

  const handleOpenDialog = (file: FileReceived) => {
    setFile(file)
    openDialog()
  }

  return (
    <MainLayout title="Documentos de entrada">
      <ConfirmDialog
        open={isDialogOpen}
        name={file?.nombre}
        onAccept={onAccept}
        onClose={onClose}
      />

      <SideSheetFilters
        open={open}
        table={table}
        yearValue={year}
        fileType={FileType.RECEIVED}
        handleClose={handleClose}
        handleOpen={handleOpen}
        setYearValue={changeYear}
      />

      <Pagination table={table} />

      <SearchBox
        table={table}
        openSideSheetFilters={handleOpen}
        type={FileType.RECEIVED}
        year={year}
      />

      <ContentScrollableLayout>
        <FilesTable table={table} type={FileType.RECEIVED} handleOpen={handleOpenDialog} />
      </ContentScrollableLayout>

      <NavigationFAB to={AppRoutesEnum.NEW_RECEIVED} />

      {(isFetching || isPending || isDeletePending) && <ProgressBar />}
      {error && <AlertMessage message={error.message} isError />}
      {showAlert && errorDeleteFile && <AlertMessage message={errorDeleteFile.message} isError />}
      {showAlert && !errorDeleteFile && (
        <AlertMessage message="Archivo eliminado" isError={false} />
      )}
    </MainLayout>
  )
}
