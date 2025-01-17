import { Box, LinearProgress } from '@mui/material'

export function ProgressBar() {
  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 8 }}>
      <LinearProgress sx={{ height: '.4rem' }} />
    </Box>
  )
}
