type Dates = {
  fecha_oficio: string
}

export function getYearsFromDates(dates: Dates[]): number[] {
  const years = dates
    .map((date) => Number(date.fecha_oficio.split('/').pop()))
    .filter((value, index, array) => array.indexOf(value) === index)
    .toSorted((a, b) => b - a)

  return years
}
