import { Header, NavigationRail } from '@renderer/components'
import { PropsWithChildren } from 'react'

type MainLayoutProps = PropsWithChildren & {
  title: string
}

export function MainLayout({ children, title }: MainLayoutProps) {
  return (
    <>
      <NavigationRail />
      <Header title={title} />

      <main>{children}</main>
    </>
  )
}
