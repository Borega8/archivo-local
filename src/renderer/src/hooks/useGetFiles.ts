import { useQuery } from '@tanstack/react-query'
import { SERVER_URL } from '@renderer/constants/routes'
import { FileType } from '@renderer/constants/file'

const getFiles = async (fileType: FileType) => {
  const response = await fetch(`${SERVER_URL}/files?type=${fileType}`)
  const data = await response.json()

  if (data.error) throw new Error(data.error)

  return data
}

export function useGetFiles(fileType: FileType) {
  return useQuery({
    queryKey: ['files', fileType],
    queryFn: () => getFiles(fileType)
  })
}
