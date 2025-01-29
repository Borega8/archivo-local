import { FileType } from '@renderer/constants/file'
import { SERVER_URL } from '@renderer/constants/routes'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const deleteFile = async (id: number, type: FileType): Promise<TFile> => {
  const response = await fetch(`${SERVER_URL}/files/${id}?type=${type}`, {
    method: 'delete'
  })
  const data = await response.json()

  if (data.error) throw new Error(data.error)

  return data
}

export function useDeleteFile(id: number, type: FileType) {
  const [showAlert, setShowAlert] = useState(false)

  const {
    data: fileDeleted,
    mutateAsync,
    isPending,
    isError,
    error
  } = useMutation({
    mutationKey: ['file', type, id],
    mutationFn: () => deleteFile(id, type),
    onSuccess: () => {
      setShowAlert(true)

      const timeOut = setTimeout(() => {
        setShowAlert(false)
        clearTimeout(timeOut)
      }, 5000)
    },
    onError: () => {
      const timeOut = setTimeout(() => {
        setShowAlert(false)
        clearTimeout(timeOut)
      }, 5000)
    }
  })

  return {
    fileDeleted,
    deleteFile: mutateAsync,
    isPending,
    errorDeleteFile: error,
    isError,
    showAlert
  }
}
