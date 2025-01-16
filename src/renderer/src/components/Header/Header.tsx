import './Header.css'

export function Header({ title }: { title: string }) {
  return (
    <header className="header">
      <div className="header-title">
        <h2 className="title-large">Usuario</h2>
      </div>
      <div className="header-actions">
        <h1 className="headline-small">{title}</h1>
      </div>
    </header>
  )
}
