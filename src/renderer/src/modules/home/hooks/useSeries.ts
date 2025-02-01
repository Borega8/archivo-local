import { SERVER_URL } from '@renderer/constants/routes'
import { useQuery } from '@tanstack/react-query'

const getSeries = async (): Promise<Serie[]> => {
  const response = await fetch(`${SERVER_URL}/series`)
  const data = await response.json()

  if (data.error) throw new Error(data.error)

  return data
}

export function useSeries() {
  return useQuery({
    queryKey: ['series'],
    queryFn: getSeries
  })
}
