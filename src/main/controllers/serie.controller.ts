import { Request, Response } from 'express'
import { SerieModel } from '../models/serie.model'
import { SeriesCalisificacion } from '@local/prisma/client'

export class SerieController {
  static async getAll(_: Request, res: Response) {
    const { data, error, status } = await SerieModel.getAll()

    return error ? res.status(status).json({ error: error.message }) : res.status(200).json(data)
  }

  static async create(req: Request, res: Response) {
    const { serie, title } = req.body
    const { data, error, status } = await SerieModel.create({
      serie,
      titulo: title
    } as SeriesCalisificacion)

    return error ? res.status(status).json({ error: error.message }) : res.status(201).json(data)
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params
    const { serie, title } = req.body
    const { data, error, status } = await SerieModel.update({
      serie,
      titulo: title,
      serie_id: Number(id)
    })

    return error ? res.status(status).json({ error: error.message }) : res.status(200).json(data)
  }

  static async deleteById(req: Request, res: Response) {
    const { id } = req.params
    const { data, error, status } = await SerieModel.deleteById(Number(id))

    return error ? res.status(status).json({ error: error.message }) : res.status(200).json(data)
  }
}
