import { getYear } from 'date-fns'
import { useState } from 'react'

export function useShowFiltersSheet({ refetchFiles }) {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
    refetchFiles()
  }
  const handleOpen = () => {
    setOpen(true)
  }

  return { open, handleOpen, handleClose }
}

export function useYearFilter() {
  const [year, setYear] = useState(getYear(new Date()))

  const changeYear = (year: number) => {
    setYear(year)
  }

  return { year, changeYear }
}
