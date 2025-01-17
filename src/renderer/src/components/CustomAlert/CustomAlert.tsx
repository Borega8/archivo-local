import { Alert, AlertProps } from '@mui/material'

export function CustomAlert({ text, ...props }: AlertProps & { text: string }) {
  return (
    <Alert
      // severity="success"
      variant="filled"
      sx={{
        width: '100%',
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        bottom: 0,
        opacity: 0.8
      }}
      {...props}
    >
      {text}
    </Alert>
  )
}
