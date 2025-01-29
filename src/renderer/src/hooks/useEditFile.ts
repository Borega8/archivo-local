import { SERVER_URL } from '@renderer/constants/routes'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const editFile = async (id: number, type: string, formData: FormData): Promise<TFile> => {
  const response = await fetch(`${SERVER_URL}/files/${id}?type=${type}`, {
    method: 'put',
    body: formData
  })
  const data = await response.json()

  if (data.error) throw new Error(data.error)

  return data
}

export function useEditFile(id: number, type: string) {
  const [showAlert, setShowAlert] = useState(false)

  const { isPending, isError, error, mutateAsync } = useMutation({
    mutationKey: ['edit', type, id],
    mutationFn: (formData: FormData) => editFile(id, type, formData),
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    const file = await mutateAsync(form)
    return file
  }

  return { mutateAsync, isPending, isError, error, onSubmit, showAlert }
}
