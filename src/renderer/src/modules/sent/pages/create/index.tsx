import { MainLayout } from '@renderer/layouts/MainLayout'
import { DocSentForm } from '@renderer/modules/sent/components'

export function NewSent() {
  return (
    <MainLayout title="Nuevo documento de salida">
      <h3 className="title-large">Datos del archivo</h3>
      <DocSentForm />
    </MainLayout>
  )
}
