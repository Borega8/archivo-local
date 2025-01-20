import { Fab, FabProps, alpha, styled } from '@mui/material'

export const CustomFAB = styled(Fab)<FabProps>(() => ({
  backgroundColor: 'var(--md-sys-color-primary-container)',
  width: '56px',
  height: '56px',
  padding: '16px',
  borderRadius: '18px',
  position: 'fixed',
  bottom: '16px',
  right: '16px',
  color: 'var(--md-sys-color-on-primary-container)',
  boxShadow: `0 1px 3px 1px ${alpha('#000', 0.15)}`,
  ':hover': {
    boxShadow: `0 1px 3px 1px ${alpha('#000', 0.3)}`,
    opacity: '0.92',
    backgroundColor: 'var(--md-sys-color-primary-container)'
  },
  textTransform: 'none',
  gap: '12px'
}))
