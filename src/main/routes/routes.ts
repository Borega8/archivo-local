import { Router } from 'express'
import { FileController } from '../controllers/file.controller'
import multer from 'multer'
import { mkdir } from 'node:fs'
import { getYear } from 'date-fns'
import { FileType } from '../constants/file'
import { BASE_DIR } from '../constants/basedir'

const storage = multer.diskStorage({
  destination: async (req, _, cb) => {
    const year = getYear(req.body.dateFile)
    const type: string = req.body.type

    mkdir(`${BASE_DIR}`, (err) => err)
    mkdir(`${BASE_DIR}/${year}`, (err) => err)

    if (type === FileType.RECEIVED) {
      mkdir(`${BASE_DIR}/${year}/DOCUMENTOS DE ENTRADA`, (err) => err)
      cb(null, `${BASE_DIR}/${year}/DOCUMENTOS DE ENTRADA`)
    } else {
      mkdir(`${BASE_DIR}/${year}/DOCUMENTOS DE SALIDA`, (err) => err)
      cb(null, `${BASE_DIR}/${year}/DOCUMENTOS DE SALIDA`)
    }
  }
})
const upload = multer({ storage: storage })

const router = Router()

router.get('/files', FileController.getAll)
router.get('/files/:id', FileController.getById)
router.post('/files', upload.array('files'), FileController.create)
router.put('/files/:id', upload.array('files'), FileController.update)
router.delete('/files/:id', FileController.deleteById)

export default router
