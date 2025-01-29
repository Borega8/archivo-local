import { SERVER_URL } from '@renderer/constants/routes'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const uploadFile = async (formData: FormData): Promise<TFile> => {
  const response = await fetch(`${SERVER_URL}/files`, {
    method: 'post',
    body: formData
  })

  const data = await response.json()

  if (data.error) throw new Error(data.error)

  return data.file
}

export function useFileUpload() {
  const [showAlert, setShowAlert] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    const file = await mutateAsync(form)
    return file
  }

  const { data, isPending, isError, error, mutateAsync } = useMutation({
    mutationKey: ['upload', 'file'],
    mutationFn: (formData: FormData) => uploadFile(formData),
    onSuccess: () => {
      setShowAlert(true)

      const timeOut = setTimeout(() => {
        setShowAlert(false)
        clearTimeout(timeOut)
      }, 5000)
    },
    onError: () => {
      setShowAlert(true)

      const timeOut = setTimeout(() => {
        setShowAlert(false)
        clearTimeout(timeOut)
      }, 5000)
    }
  })

  return { data, isPending, isError, errorUploadFile: error, showAlert, uploadFile: onSubmit }
}
