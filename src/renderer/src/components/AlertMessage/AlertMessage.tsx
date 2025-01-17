import { CustomAlert } from '@renderer/components'

type AlertMessageProps = {
  message: string
  isError: boolean
}

export function AlertMessage({ isError, message }: AlertMessageProps) {
  if (isError) return <CustomAlert text={message} severity="error" />

  return <CustomAlert text={message} severity="success" />
}
