import { SERVER_URL } from '@renderer/constants/routes'
import { QueryObserverResult, RefetchOptions, useMutation } from '@tanstack/react-query'
import { useState } from 'react'

type UseAddAutocompleteProps = {
  refetchFieldValues: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<FieldValue[], Error>>
}

const addAutocomplete = async (formData: FormData): Promise<FieldValue[]> => {
  const response = await fetch(`${SERVER_URL}/fields`, {
    method: 'post',
    body: formData
  })
  const data = await response.json()

  if (data.error) throw new Error(data.error)

  return data
}

export function useAddAutocomplete({ refetchFieldValues }: UseAddAutocompleteProps) {
  const [showAlert, setShowAlert] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    await mutateAsync(form)
    await refetchFieldValues()
  }

  const { data, isPending, isError, error, mutateAsync } = useMutation({
    mutationKey: ['autocomplete', 'add'],
    mutationFn: (formData: FormData) => addAutocomplete(formData),
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

  return { data, isPending, isError, error, showAlert, onSubmit }
}
