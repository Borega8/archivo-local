export enum Fields {
  createdBy = 'Elaboró',
  dependency = 'Dependencia',
  location = 'Ubicación',
  status = 'Estatus',
  turn = 'Turnado',
  whoReceived = 'Quién recibe',
  whoSigns = 'Firma',
  to = 'Dirigido a',
  atn = "Cont at'n a"
}

export const fieldsArray = Object.values(Fields).sort()
