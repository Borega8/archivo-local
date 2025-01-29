import { SERVER_URL } from '@renderer/constants/routes'
import { useQuery } from '@tanstack/react-query'

const getFile = async (id: number, type: string): Promise<TFile> => {
  const response = await fetch(`${SERVER_URL}/files/${id}?type=${type}`)
  const data = await response.json()

  if (data.error) throw new Error(data.error)

  return data
}

export function useGetFile(id: number, type: string) {
  const { data, isFetching, error } = useQuery({
    queryKey: ['file', type, id],
    queryFn: () => getFile(id, type)
  })

  return { data, isFetching, error }
}
