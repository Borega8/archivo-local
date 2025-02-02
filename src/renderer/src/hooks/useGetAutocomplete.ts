import { SERVER_URL } from '@renderer/constants/routes'
import { useQuery } from '@tanstack/react-query'

const getFieldValues = async (): Promise<FieldValue[]> => {
  const response = await fetch(`${SERVER_URL}/fields`)
  const data = await response.json()

  if (data.error) throw new Error(data.error)

  return data
}

export function useGetAutocomplete() {
  return useQuery({
    queryKey: ['autocomplete'],
    queryFn: getFieldValues
  })
}
