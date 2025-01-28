import { FileType } from '@renderer/constants/file'
import { SERVER_URL } from '@renderer/constants/routes'
import { useQuery } from '@tanstack/react-query'

const fetchYears = async (type: FileType): Promise<number[]> => {
  const response = await fetch(`${SERVER_URL}/files/years?type=${type}`)
  const data = await response.json()

  if (data.error) throw new Error(data.error)

  return data
}

export function useYears(type: FileType) {
  return useQuery({
    queryKey: ['years', type],
    queryFn: () => fetchYears(type)
  })
}
