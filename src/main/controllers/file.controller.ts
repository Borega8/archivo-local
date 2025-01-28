import { Request, Response } from 'express'
import { FileModel } from '../models/file.model'
import { FileType } from '../constants/file'
import { TFile } from '../types/File'
import { mkdir, rename } from 'node:fs'

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
    if (!req.files) return res.status(400).json({ error: 'No file selected' })
    const files = req.files as Express.Multer.File[]
    let filePath = ''

    if (files.length === 1) {
      const fileExtension = `${files[0].originalname.split('.').pop()}`
      const oldFilePath = `${files[0].destination}/${files[0].filename}`
      filePath = `${files[0].destination}/${fileName}.${fileExtension}`

      rename(oldFilePath, filePath, (err) => {
        if (err) res.status(500).json({ error: 'Cannot rename folder' })
      })
    } else {
      filePath = `${files[0].destination}/${fileName}`
      mkdir(filePath, { recursive: true }, (err) => {
        if (err) return res.status(500).json({ error: 'Cannot create folder' })
        return null
      })

      files.map(async (file, index) => {
        const fileExtension = `${files[0].originalname.split('.').pop()}`
        const oldFilePath = `${file.destination}/${file.filename}`
        const newFilePath = `${filePath}/${index + 1}.${fileExtension}`

        rename(oldFilePath, newFilePath, (err) => {
          if (err) return res.status(500).json({ error: 'Cannot rename folder' })
          return null
        })
      })
    }

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
        file_path: filePath
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
    const files = req.files as Express.Multer.File[]

    if (files.length == 0) {
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
          documento_id: Number(id)
        } as TFile,
        type
      )

      return error
        ? res.status(statusCode).json({ error: error.message })
        : res.status(200).json(data)
    }

    // Request have one file
    else if (files.length == 1) {
      const fileExtension = `${files[0].originalname.split('.').pop()}`
      const oldFilePath = `${files[0].destination}/${files[0].filename}`
      const newFilePath = `${files[0].destination}/${fileName}.${fileExtension}`

      rename(oldFilePath, newFilePath, (err) => {
        if (err) return res.status(500).json({ error: 'Cannot rename folder' })
        return null
      })

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
          file_path: newFilePath,
          documento_id: Number(id)
        } as TFile,
        type
      )

      return error
        ? res.status(statusCode).json({ error: error.message })
        : res.status(200).json(data)
    }

    // Request have multiple files
    const newDir = `${files[0].destination}/${fileName}`
    mkdir(newDir, { recursive: true }, (err) => {
      if (err) return res.status(500).json({ error: 'Cannot create folder' })
      return null
    })

    files.map(async (file, index) => {
      const fileExtension = `${files[0].originalname.split('.').pop()}`
      const oldFilePath = `${file.destination}/${file.filename}`
      const newFilePath = `${newDir}/${index + 1}.${fileExtension}`

      rename(oldFilePath, newFilePath, (err) => {
        if (err) return res.status(500).json({ error: 'Cannot rename folder' })
        return null
      })
    })

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
        file_path: newDir,
        documento_id: Number(id)
      } as TFile,
      type
    )

    return error
      ? res.status(statusCode).json({ error: error.message })
      : res.status(200).json(data)
  }

  static async deleteById(req: Request, res: Response) {
    const { id } = req.params
    const { type } = req.query

    const { data, error, status } = await FileModel.deleteById(Number(id), type as FileType)

    return error ? res.status(status).json({ error: error.message }) : res.status(200).json(data)
  }

  static async getFilesYears(req: Request, res: Response) {
    const { type } = req.query

    if (!type) return res.status(400).json({ error: 'File type not received' })

    const { data, error, status } = await FileModel.getYears(type as FileType)
    if (error) return res.status(status).json({ error: error.message })

    return res.json({ data })
  }
}
