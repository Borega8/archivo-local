import styled from '@emotion/styled'
import { Button, ButtonProps } from '@mui/material'

export const CustomButton = styled(Button)<ButtonProps>(() => ({
  height: '40px',
  borderRadius: '20px',
  width: '150px',
  textTransform: 'none'
}))
