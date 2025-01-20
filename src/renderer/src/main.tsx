import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from '@emotion/react'
import { theme } from './utils/theme'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './constants/queryClient'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
)
