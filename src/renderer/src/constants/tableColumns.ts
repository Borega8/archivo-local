import { filterFilesByDate } from '@renderer/utils/filterFiles'
import { ColumnDef } from '@tanstack/react-table'

export const columnsFileReceived: ColumnDef<FileReceived>[] = [
  {
    header: 'Acciones',
    id: 'actions',
    minSize: 107
  },
  {
    header: 'Nombre',
    accessorKey: 'nombre',
    minSize: 99
  },
  {
    header: 'Dependencia',
    accessorKey: 'dependencia'
  },
  {
    header: 'No. Oficio',
    accessorKey: 'no_oficio'
  },
  {
    header: 'Asunto',
    accessorKey: 'asunto'
  },
  {
    header: 'Fecha del oficio',
    accessorKey: 'fecha_oficio',
    minSize: 150,
    filterFn: filterFilesByDate
  },
  {
    header: 'Dirigido a',
    accessorKey: 'para',
    minSize: 110
  },
  {
    header: "Con at'n a",
    accessorKey: 'atn'
  },
  {
    header: 'Firma',
    accessorKey: 'quien_firma'
  },
  {
    header: 'Quien recibe',
    accessorKey: 'quien_recibe',
    minSize: 130
  },
  {
    header: 'Fecha de recepcion',
    accessorKey: 'fecha_recibido',
    minSize: 175
  },
  {
    header: 'Turnado',
    accessorKey: 'turnado'
  },
  {
    header: 'Estatus',
    accessorKey: 'estado',
    minSize: 95
  },
  {
    header: 'Codigo de clasificacion',
    accessorKey: 'codigo_clasificacion',
    minSize: 201
  },
  {
    header: 'Ubicacion',
    accessorKey: 'ubicacion',
    minSize: 113
  },
  {
    header: 'Observaciones',
    accessorKey: 'observaciones'
  }
]

export const columnsFileSent: ColumnDef<FileSent>[] = [
  {
    header: 'Acciones',
    id: 'actions',
    minSize: 107
  },
  {
    header: 'Nombre',
    accessorKey: 'nombre',
    minSize: 99
  },
  {
    header: 'Dependencia',
    accessorKey: 'dependencia'
  },
  {
    header: 'No. Oficio',
    accessorKey: 'no_oficio'
  },
  {
    header: 'Asunto',
    accessorKey: 'asunto'
  },
  {
    header: 'Fecha del oficio',
    accessorKey: 'fecha_oficio',
    minSize: 150,
    filterFn: filterFilesByDate
  },
  {
    header: 'Dirigido a',
    accessorKey: 'para',
    minSize: 110
  },
  {
    header: "Con at'n a",
    accessorKey: 'atn'
  },
  {
    header: 'Firma',
    accessorKey: 'quien_firma'
  },
  {
    header: 'Elaboró',
    accessorKey: 'quien_elaboro'
  },
  {
    header: 'Fecha de envío',
    accessorKey: 'fecha_envio',
    minSize: 175
  },
  {
    header: 'Fecha de recepcion',
    accessorKey: 'fecha_recibido',
    minSize: 175
  },
  {
    header: 'Quién recibe',
    accessorKey: 'quien_recibe',
    minSize: 130
  },
  {
    header: 'Estatus',
    accessorKey: 'estado',
    minSize: 95
  },
  {
    header: 'Codigo de clasificacion',
    accessorKey: 'codigo_clasificacion',
    minSize: 201
  },
  {
    header: 'Ubicacion',
    accessorKey: 'ubicacion',
    minSize: 113
  },
  {
    header: 'Observaciones',
    accessorKey: 'observaciones'
  }
]
