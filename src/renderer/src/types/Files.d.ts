export type FileReceived = {
  documento_id: number
  nombre: string
  dependencia: string
  no_oficio: string
  asunto: string
  fecha_oficio: string
  para: string
  atn: string
  quien_firma: string
  quien_recibe: string
  fecha_recibido: string
  turnado: string
  estado: string
  codigo_clasificacion: string
  ubicacion: string
  observaciones: string
  file_path: string
}

export type FileSent = {
  documento_id: number
  nombre: string
  dependencia: string
  no_oficio: string
  asunto: string
  fecha_oficio: string
  para: string
  atn: string
  quien_firma: string
  quien_elaboro: string
  fecha_recibido: string
  quien_recibe: string
  estado: string
  codigo_clasificacion: string
  ubicacion: string
  observaciones: string
  file_path: string
}

export type FilesJSON = {
  files: FileReceived[] | FileSent[]
}

export type TFile = FileReceived | FileSent
