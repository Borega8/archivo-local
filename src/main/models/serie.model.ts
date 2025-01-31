import { prisma } from '../constants/database'
import { ReturnValue } from '../types/ReturnValue'
import { SeriesCalisificacion } from '@local/prisma/client'

export class SerieModel {
  static async getAll(): Promise<ReturnValue<SeriesCalisificacion[]>> {
    try {
      const series = await prisma.seriesCalisificacion.findMany()

      return { data: series }
    } catch (error) {
      return { error: new Error('Cannot get series'), status: 500 }
    }
  }

  static async create(serieData: SeriesCalisificacion): Promise<ReturnValue<SeriesCalisificacion>> {
    try {
      const serie = await prisma.seriesCalisificacion.create({
        data: {
          serie: serieData.serie,
          titulo: serieData.titulo
        }
      })

      return { data: serie }
    } catch (error) {
      return { error: new Error('Cannot create new serie'), status: 500 }
    }
  }

  static async update(serieData: SeriesCalisificacion): Promise<ReturnValue<SeriesCalisificacion>> {
    try {
      const serieFound = await prisma.seriesCalisificacion.findUnique({
        where: {
          serie_id: serieData.serie_id
        },
        select: { serie_id: true }
      })

      if (!serieFound) return { error: new Error('Serie not found'), status: 404 }

      const serie = await prisma.seriesCalisificacion.update({
        data: {
          serie: serieData.serie,
          titulo: serieData.titulo
        },
        where: {
          serie_id: serieData.serie_id
        }
      })

      return { data: serie }
    } catch (error) {
      return { error: new Error('Cannot create new serie'), status: 500 }
    }
  }

  static async deleteById(id: number): Promise<ReturnValue<SeriesCalisificacion>> {
    try {
      const serieFound = await prisma.seriesCalisificacion.findUnique({
        where: {
          serie_id: id
        },
        select: { serie_id: true }
      })

      if (!serieFound) return { error: new Error('Serie not found'), status: 404 }

      const serie = await prisma.seriesCalisificacion.delete({
        where: {
          serie_id: id
        }
      })

      return { data: serie }
    } catch (error) {
      return { error: new Error('Cannot create new serie'), status: 500 }
    }
  }
}
