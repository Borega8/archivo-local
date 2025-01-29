type FileReceived = {
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

type FileSent = {
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
  fecha_enviado: string
  quien_recibe: string
  estado: string
  codigo_clasificacion: string
  ubicacion: string
  observaciones: string
  file_path: string
}

type FilesJSON = {
  files: FileReceived[] | FileSent[]
}

type TFile = FileReceived | FileSent
