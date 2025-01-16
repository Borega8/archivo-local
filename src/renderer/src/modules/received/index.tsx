import { FileType } from '@renderer/constants/file'
import { SERVER_URL } from '@renderer/constants/routes'
import { useQuery } from '@tanstack/react-query'

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

export function Received() {
  const { data: files, isLoading, error } = useGetFiles(FileType.RECEIVED)

  isLoading && <h3>Locading...</h3>
  error && <h3>{error.message}</h3>

  console.log(files)

  return <div>Received</div>
}
