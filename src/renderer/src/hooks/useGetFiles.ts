import { useQuery } from '@tanstack/react-query'
import { SERVER_URL } from '@renderer/constants/routes'
import { FileType } from '@renderer/constants/file'

const getFiles = async (fileType: FileType, year: number) => {
  const response = await fetch(`${SERVER_URL}/files?type=${fileType}&year=${year}`)
  const data = await response.json()

  if (data.error) throw new Error(data.error)

  return data
}

export function useGetFiles(fileType: FileType, year: number) {
  return useQuery({
    queryKey: ['files', fileType],
    queryFn: () => getFiles(fileType, year)
  })
}
