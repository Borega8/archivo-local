import { NavLink } from 'react-router-dom'
import { CustomFAB } from '@renderer/components'
import { Add } from '@mui/icons-material'

export function NavigationFAB({
  to,
  children = <Add />
}: {
  to: string
  children?: React.ReactElement
}) {
  return (
    <NavLink to={to}>
      <CustomFAB>{children}</CustomFAB>
    </NavLink>
  )
}
