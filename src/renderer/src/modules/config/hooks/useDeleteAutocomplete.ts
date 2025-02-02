import { SERVER_URL } from '@renderer/constants/routes'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const deleteFieldValue = async (id: number): Promise<FieldValue> => {
  const response = await fetch(`${SERVER_URL}/fields/${id}`, {
    method: 'delete'
  })
  const data = await response.json()

  if (data.error) throw new Error(data.error)

  return data
}

export function useDeleteAutocomplete(id: number) {
  const [showAlert, setShowAlert] = useState(false)

  const { data, mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: ['autocomplete', id],
    mutationFn: () => deleteFieldValue(id),
    onSuccess: () => {
      setShowAlert(true)

      setTimeout(() => {
        setShowAlert(false)
      }, 5000)
    },
    onError: () => {
      setShowAlert(true)

      setTimeout(() => {
        setShowAlert(false)
      }, 5000)
    }
  })

  return {
    data,
    mutateAsync,
    isPending,
    isError,
    error,
    showAlert
  }
}
