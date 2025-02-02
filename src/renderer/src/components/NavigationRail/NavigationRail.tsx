import { NavigationElement } from '@renderer/components'
import './NavigationRail.css'
import {
  ArrowBack,
  Home,
  HomeOutlined,
  Input,
  InputOutlined,
  Output,
  OutputOutlined,
  Settings,
  SettingsOutlined
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
          currentPath={currentPath === '#/' || currentPath === '' ? '/' : currentPath}
          to={AppRoutesEnum.HOME}
          label="Principal"
          iconActive={<Home />}
          iconInactive={<HomeOutlined />}
        />
        <NavigationElement
          currentPath={currentPath.slice(1)}
          to={AppRoutesEnum.RECEIVED}
          label="Recibidos"
          iconActive={<Input />}
          iconInactive={<InputOutlined />}
        />
        <NavigationElement
          currentPath={currentPath.slice(1)}
          to={AppRoutesEnum.SENT}
          label="Enviados"
          iconActive={<Output />}
          iconInactive={<OutputOutlined />}
        />
        <NavigationElement
          currentPath={currentPath.slice(1)}
          to={AppRoutesEnum.CONFIG}
          label="Config"
          iconActive={<Settings />}
          iconInactive={<SettingsOutlined />}
        />
      </section>
    </nav>
  )
}
