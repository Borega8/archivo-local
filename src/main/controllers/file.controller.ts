import { Request, Response } from 'express'
import { FileModel } from '../models/file.model'
import { FileType } from '../constants/file'
import { TFile } from '../types/File'

export class FileController {
  static async getById(req: Request, res: Response) {
    const { id } = req.params
    const { type } = req.query
    const { data, error, status } = await FileModel.getById(Number(id), type as FileType)

    return error ? res.status(status).json({ error: error.message }) : res.status(200).json(data)
  }

  static async getAll(req: Request, res: Response) {
    const { type } = req.query
    const { data, error, status } = await FileModel.getAll(type as FileType)

    return error ? res.status(status).json({ error: error.message }) : res.status(200).json(data)
  }

  static async create(req: Request, res: Response) {
    const {
      type,
      dependency,
      noFile,
      subject,
      dateFile,
      to,
      atn,
      whoSigns,
      whoReceived,
      createdBy,
      dateReceived,
      turn,
      status,
      serieCode,
      location,
      observations,
      fileName
    }: {
      type: FileType
      dependency: string
      noFile: string
      subject: string
      dateFile: string
      to: string
      atn: string
      whoSigns: string
      whoReceived: string
      createdBy: string
      dateReceived: string
      turn: string
      status: string
      serieCode: string
      location: string
      observations: string
      fileName: string
    } = req.body

    const {
      data,
      error,
      status: statusCode
    } = await FileModel.create(
      {
        asunto: subject,
        atn: atn,
        codigo_clasificacion: serieCode,
        dependencia: dependency,
        estado: status,
        fecha_oficio: dateFile,
        fecha_recibido: dateReceived,
        no_oficio: noFile,
        nombre: fileName,
        observaciones: observations,
        para: to,
        quien_elaboro: createdBy,
        quien_firma: whoSigns,
        quien_recibe: whoReceived,
        turnado: turn,
        ubicacion: location,
        file_path: ''
      } as TFile,
      type
    )

    return error
      ? res.status(statusCode).json({ error: error.message })
      : res.status(201).json(data)
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params
    const {
      type,
      dependency,
      noFile,
      subject,
      dateFile,
      to,
      atn,
      whoSigns,
      whoReceived,
      createdBy,
      dateReceived,
      turn,
      status,
      serieCode,
      location,
      observations,
      fileName
    }: {
      type: FileType
      dependency: string
      noFile: string
      subject: string
      dateFile: string
      to: string
      atn: string
      whoSigns: string
      whoReceived: string
      createdBy: string
      dateReceived: string
      turn: string
      status: string
      serieCode: string
      location: string
      observations: string
      fileName: string
    } = req.body

    const {
      data,
      error,
      status: statusCode
    } = await FileModel.update(
      {
        asunto: subject,
        atn: atn,
        codigo_clasificacion: serieCode,
        dependencia: dependency,
        estado: status,
        fecha_oficio: dateFile,
        fecha_recibido: dateReceived,
        no_oficio: noFile,
        nombre: fileName,
        observaciones: observations,
        para: to,
        quien_elaboro: createdBy,
        quien_firma: whoSigns,
        quien_recibe: whoReceived,
        turnado: turn,
        ubicacion: location,
        file_path: '',
        documento_id: Number(id)
      } as TFile,
      type
    )

    return error
      ? res.status(statusCode).json({ error: error.message })
      : res.status(200).json(data)
  }

  static async deleteById(req: Request, res: Response) {}
}
