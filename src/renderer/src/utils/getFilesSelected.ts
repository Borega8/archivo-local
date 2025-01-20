export const getFilesSelected = (files: FileList): string => {
  if (files.length == 1) return files[0].name

  return `${files.length} archivos seleccionados`
}
