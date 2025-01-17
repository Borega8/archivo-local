import { NavLink } from 'react-router-dom'
import { ReactNode } from 'react'

type NavigationElementProps = {
  currentPath: string
  to: string
  label: string
  iconActive: ReactNode
  iconInactive: ReactNode
}

export function NavigationElement({
  currentPath,
  to,
  label,
  iconActive,
  iconInactive
}: NavigationElementProps) {
  const isCurrentPage = currentPath === to || currentPath.startsWith(to)
  return (
    <NavLink
      to={to}
      className={isCurrentPage ? 'link label-medium-prominent' : 'link label-medium'}
    >
      <span className={isCurrentPage ? 'mui-icon icon-active' : 'mui-icon'}>
        {isCurrentPage ? iconActive : iconInactive}
      </span>
      {label}
    </NavLink>
  )
}
