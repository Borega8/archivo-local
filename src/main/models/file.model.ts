import { prisma } from '../constants/database'
import { FileType } from '../constants/file'
import { TFile } from '../types/File'
import { ReturnValue } from '../types/ReturnValue'

export class FileModel {
  static async getAll(type: FileType): Promise<ReturnValue<TFile[]>> {
    try {
      if (type == FileType.RECEIVED) {
        const files = await prisma.documentosRecibidos.findMany()

        return { data: files as TFile[] }
      } else if (type == FileType.SENT) {
        const files = await prisma.documentosEnviados.findMany()

        return { data: files as TFile[] }
      }
    } catch (error) {
      return { error: new Error('Something went wrong, please try again'), status: 500 }
    }

    return { error: new Error('Incorrect file type'), status: 400 }
  }

  static async create(fileData: TFile, type: FileType): Promise<ReturnValue<TFile>> {
    try {
      if (type == FileType.RECEIVED) {
        const file = await prisma.documentosRecibidos.create({
          data: {
            asunto: fileData.asunto,
            atn: fileData.atn,
            codigo_clasificacion: fileData.codigo_clasificacion,
            dependencia: fileData.dependencia,
            estado: fileData.estado,
            fecha_oficio: fileData.fecha_oficio,
            fecha_recibido: fileData.fecha_recibido,
            file_path: fileData.file_path,
            no_oficio: fileData.no_oficio,
            nombre: fileData.nombre,
            observaciones: fileData.observaciones,
            para: fileData.para,
            quien_firma: fileData.quien_firma,
            quien_recibe: fileData.quien_recibe,
            turnado: fileData.turnado,
            ubicacion: fileData.ubicacion
          }
        })

        await prisma.$disconnect()

        return { data: file as TFile }
      } else if (type == FileType.SENT) {
        const file = await prisma.documentosEnviados.create({
          data: {
            asunto: fileData.asunto,
            atn: fileData.atn,
            codigo_clasificacion: fileData.codigo_clasificacion,
            dependencia: fileData.dependencia,
            estado: fileData.estado,
            fecha_oficio: fileData.fecha_oficio,
            fecha_recibido: fileData.fecha_recibido,
            file_path: fileData.file_path,
            no_oficio: fileData.no_oficio,
            nombre: fileData.nombre,
            observaciones: fileData.observaciones,
            para: fileData.para,
            quien_firma: fileData.quien_firma,
            quien_recibe: fileData.quien_recibe,
            quien_elaboro: fileData.quien_elaboro,
            ubicacion: fileData.ubicacion
          }
        })

        await prisma.$disconnect()

        return { data: file as TFile }
      }
    } catch (error) {
      return { error: new Error('Unable to save the document'), status: 500 }
    }

    return { error: new Error('Incorrect file type'), status: 400 }
  }
}
