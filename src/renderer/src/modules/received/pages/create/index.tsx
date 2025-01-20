import { MainLayout } from '@renderer/layouts/MainLayout'
import { DocReceivedForm } from '@renderer/modules/received/components'

export function NewReceived() {
  return (
    <MainLayout title="Nuevo documento de entrada">
      <h3 className="title-large">Datos del archivo</h3>
      <DocReceivedForm />
    </MainLayout>
  )
}
