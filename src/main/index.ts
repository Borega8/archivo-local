import { app, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import createWindow from './utils/createWindow'
import server from './config/express'
import { FileType } from './constants/file'
import { mkdir } from 'node:fs'
import { FileModel } from './models/file.model'
import XlsxPopulate from 'xlsx-populate'
import { DocumentosEnviados, DocumentosRecibidos } from '@local/prisma/client'

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  electronApp.setAppUserModelId('dev.borega:archivo-local')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('export', async (ev, args: [FileType, number]) => {
    mkdir(
      `${process.env.USERPROFILE?.replaceAll('\\', '/')}/ARCHIVO MUNICIPAL/${args[1]}/`,
      (err) => {
        if (err) return err

        return null
      }
    )

    const { data } = await FileModel.getAll(args[0], args[1].toString())
    if (!data) return

    const book = await XlsxPopulate.fromBlankAsync()

    if (args[0] === FileType.RECEIVED) {
      book
        .sheet(0)
        .cell('A1')
        .value([
          [
            'Nombre',
            'Dependencia',
            'No. de oficio',
            'Asunto',
            'Fecha del oficio',
            'Dirigido a',
            "Con at'n a",
            'Firma',
            'Quién recibe',
            'Fecha de recepción',
            'Turnado',
            'Estado',
            'Código de clasificación',
            'Ubicación',
            'Observaciones'
          ],
          [
            (data as DocumentosRecibidos[])?.map((file) => [
              file.nombre,
              file.dependencia,
              file.no_oficio,
              file.asunto,
              file.fecha_oficio,
              file.para,
              file.atn,
              file.quien_firma,
              file.quien_recibe,
              file.fecha_recibido,
              file.turnado,
              file.estado,
              file.codigo_clasificacion,
              file.ubicacion,
              file.observaciones
            ])
          ]
        ])

      data.map((file, index) => {
        book
          .sheet(0)
          .cell(`A${index + 2}`)
          .value(file.nombre)
          .hyperlink(file.file_path)
      })

      book.toFileAsync(
        `${process.env.USERPROFILE?.replaceAll('\\', '/')}/ARCHIVO MUNICIPAL/${args[1]}/RECIBIDOS ${args[1]}.xlsx`
      )

      ev.reply(
        'exported',
        `${process.env.USERPROFILE?.replaceAll('\\', '/')}/ARCHIVO MUNICIPAL/${args[1]}/RECIBIDOS ${args[1]}.xlsx`
      )

      return
    } else if (args[0] === FileType.SENT) {
      book
        .sheet(0)
        .cell('A1')
        .value([
          [
            'Nombre',
            'Dependencia',
            'No. de oficio',
            'Asunto',
            'Fecha del oficio',
            'Dirigido a',
            "Con at'n a",
            'Firma',
            'Elaboró',
            'Fecha de envío',
            'Fecha de recepción',
            'Quién recibe',
            'Estatus',
            'Código de clasificación',
            'Ubicación',
            'Observaciones'
          ],
          [
            (data as DocumentosEnviados[])?.map((file) => [
              file.nombre,
              file.dependencia,
              file.no_oficio,
              file.asunto,
              file.fecha_oficio,
              file.para,
              file.atn,
              file.quien_firma,
              file.quien_elaboro,
              file.fecha_envio,
              file.fecha_recibido,
              file.quien_recibe,
              file.estado,
              file.codigo_clasificacion,
              file.ubicacion,
              file.observaciones
            ])
          ]
        ])

      data.map((file, index) => {
        book
          .sheet(0)
          .cell(`A${index + 2}`)
          .value(file.nombre)
          .hyperlink(file.file_path)
      })

      book.toFileAsync(
        `${process.env.USERPROFILE?.replaceAll('\\', '/')}/ARCHIVO MUNICIPAL/${args[1]}/ENVIADOS ${args[1]}.xlsx`
      )
      ev.reply(
        'exported',
        `${process.env.USERPROFILE?.replaceAll('\\', '/')}/ARCHIVO MUNICIPAL/${args[1]}/ENVIADOS ${args[1]}.xlsx`
      )
    }
  })

  createWindow()
  server.listen(5000)

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
