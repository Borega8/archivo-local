import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#8a0f5c',
      contrastText: '#fff'
    },
    secondary: {
      main: '#ffbdda',
      contrastText: '#602a46'
    }
  },
  typography: {
    fontFamily: [
      'Poppins',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      '"Open Sans"',
      '"Helvetica Neue"',
      'sans-serif'
    ].join(',')
  }
})
