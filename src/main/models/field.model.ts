import { prisma } from '../constants/database'
import { ReturnValue } from '../types/ReturnValue'
import { Autocompletado } from '@local/prisma/client'

export class AutocompleteFieldModel {
  static async getAll(): Promise<ReturnValue<Autocompletado[]>> {
    try {
      const fields = await prisma.autocompletado.findMany({
        orderBy: { campo: 'asc', valor: 'asc' }
      })

      return { data: fields }
    } catch (error) {
      return { error: new Error('Cannot get field values'), status: 500 }
    }
  }

  static async create(
    data: Omit<Autocompletado, 'autocompletado_id'>
  ): Promise<ReturnValue<Autocompletado>> {
    try {
      const field = await prisma.autocompletado.create({
        data: {
          campo: data.campo,
          valor: data.valor
        }
      })

      return { data: field }
    } catch (error) {
      return { error: new Error('Cannot create field value'), status: 500 }
    }
  }

  static async deleteById(id: number): Promise<ReturnValue<Autocompletado>> {
    try {
      const field = await prisma.autocompletado.findUnique({
        where: {
          autocompletado_id: id
        }
      })

      if (!field) return { error: new Error('Field value no found'), status: 404 }

      await prisma.autocompletado.delete({
        where: {
          autocompletado_id: id
        }
      })

      return { data: field }
    } catch (error) {
      return { error: new Error('Cannot delete field value'), status: 500 }
    }
  }
}
