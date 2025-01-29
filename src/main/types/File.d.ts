import { DocumentosRecibidos, DocumentosEnviados } from '@local/prisma/client'

type DocsReceived = DocumentosRecibidos & {
  quien_elaboro: never
  fecha_envio: never
}

type DocsSent = DocumentosEnviados & {
  turnado: never
}

export type TFile = DocsReceived | DocsSent
