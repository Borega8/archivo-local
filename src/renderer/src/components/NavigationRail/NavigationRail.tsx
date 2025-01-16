import { NavigationElement } from '@renderer/components'
import './NavigationRail.css'
import {
  ArrowBack,
  Home,
  HomeOutlined,
  Input,
  InputOutlined,
  Output,
  OutputOutlined
} from '@mui/icons-material'
import { AppRoutesEnum } from '@renderer/constants/routes'

export function NavigationRail() {
  const currentPath = document.location.hash

  return (
    <nav className="navigation-rail">
      <ArrowBack
        style={{ color: 'var(--md-sys-color-on-surface-variant)', cursor: 'pointer' }}
        onClick={() => window.history.back()}
      />
      <section className="links">
        <NavigationElement
          currentPath={currentPath === '' ? '/' : currentPath}
          to={AppRoutesEnum.HOME}
          label="Principal"
          iconActive={<Home />}
          iconInactive={<HomeOutlined />}
        />
        <NavigationElement
          currentPath={currentPath}
          to={AppRoutesEnum.RECEIVED}
          label="Recibidos"
          iconActive={<Input />}
          iconInactive={<InputOutlined />}
        />
        <NavigationElement
          currentPath={currentPath}
          to={AppRoutesEnum.SENT}
          label="Enviados"
          iconActive={<Output />}
          iconInactive={<OutputOutlined />}
        />
      </section>
    </nav>
  )
}
