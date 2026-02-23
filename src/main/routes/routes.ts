import { Router } from 'express'
import { FileController } from '../controllers/file.controller'
import multer from 'multer'
import { mkdir } from 'node:fs/promises'
import { format, getYear } from 'date-fns'
import { es } from 'date-fns/locale'
import { FileType } from '../constants/file'
import { BASE_DIR } from '../constants/basedir'
import { SerieController } from '../controllers/serie.controller'
import { AutocompleteFieldController } from '../controllers/field.controller'
import { receivedFolder, sentFolder } from '../constants/folders'

const storage = multer.diskStorage({
  destination: async (req, _, cb) => {
    const year = getYear(req.body.dateFile)
    const month = format(req.body.dateReceived.split('/')[0], 'MMMM', { locale: es }).toUpperCase()
    const type: string = req.body.type

    const filePath = `${BASE_DIR}/DIRECCION DE DESARROLLO RURAL ${year}`

    await mkdir(filePath, { recursive: true })

    if (type === FileType.RECEIVED) {
      await mkdir(`${filePath}/${receivedFolder}/${month}`,  {recursive: true })
      cb(null, `${filePath}/${receivedFolder}/${month}`)
    } else {
      await mkdir(`${filePath}/${sentFolder}/${month}`, { recursive: true })
      cb(null, `${filePath}/${sentFolder}/${month}`)
    }
  }
})
const upload = multer({ storage: storage })

const router = Router()

router.get('/files', FileController.getAll)
router.get('/files/years', FileController.getFilesYears)
router.get('/files/:id', FileController.getById)
router.post('/files', upload.array('files'), FileController.create)
router.put('/files/:id', upload.array('files'), FileController.update)
router.delete('/files/:id', FileController.deleteById)

router.get('/series', SerieController.getAll)
router.post('/series', upload.none(), SerieController.create)
router.put('/series/:id', upload.none(), SerieController.update)
router.delete('/series/:id', SerieController.deleteById)

router.get('/fields', AutocompleteFieldController.getAll)
router.post('/fields', upload.none(), AutocompleteFieldController.create)
router.delete('/fields/:id', AutocompleteFieldController.deleteById)

export default router
