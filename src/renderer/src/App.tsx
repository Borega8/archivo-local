import { HashRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from './constants/routes'

function App(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        {AppRoutes.map((route) => (
          <Route key={route.path} path={route.path} Component={route.element} />
        ))}
      </Routes>
    </HashRouter>
  )
}

export default App
