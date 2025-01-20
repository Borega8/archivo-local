import { TextField, TextFieldProps, styled } from '@mui/material'

export const CustomTextField = styled(TextField)<TextFieldProps>(() => ({
  minWidth: '420px'
}))
