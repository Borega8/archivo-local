type SuccessResponse<T> = {
  error?: never
  status?: never
  data: T
}

type ErrorResponse = {
  error: Error
  status: number
  data?: never
}

export type ReturnValue<T> = SuccessResponse<T> | ErrorResponse
