import { Request, Response } from 'express'
import { AutocompleteFieldModel } from '../models/field.model'

export class AutocompleteFieldController {
  static async getAll(_: Request, res: Response) {
    const { data, error, status } = await AutocompleteFieldModel.getAll()

    return error ? res.status(status).json({ error: error.message }) : res.json(data)
  }

  static async create(req: Request, res: Response) {
    const { field, value } = req.body

    const { data, error, status } = await AutocompleteFieldModel.create({
      campo: field,
      valor: value
    })

    return error ? res.status(status).json({ error: error.message }) : res.status(201).json(data)
  }

  static async deleteById(req: Request, res: Response) {
    const { id } = req.params

    const { data, error, status } = await AutocompleteFieldModel.deleteById(Number(id))

    return error ? res.status(status).json({ error: error.message }) : res.json(data)
  }
}
