import { SERVER_URL } from '@renderer/constants/routes'
import { QueryObserverResult, RefetchOptions, useMutation } from '@tanstack/react-query'
import { useState } from 'react'

type UseAddSerieProps = {
  refetchSeries: (options?: RefetchOptions) => Promise<QueryObserverResult<Serie[], Error>>
}

const addSerie = async (formData: FormData): Promise<Serie> => {
  const response = await fetch(`${SERVER_URL}/series`, {
    method: 'post',
    body: formData
  })

  const data = await response.json()

  if (data.error) throw new Error(data.error)

  return data
}

export function useAddSerie({ refetchSeries }: UseAddSerieProps) {
  const [showAlert, setShowAlert] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    await mutateAsync(form)
    await refetchSeries()
  }

  const { data, isPending, isError, error, mutateAsync } = useMutation({
    mutationKey: ['series', 'add'],
    mutationFn: (formData: FormData) => addSerie(formData),
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
