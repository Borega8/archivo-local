import { Router } from 'express'
import { FileController } from '../controllers/file.controller'

const router = Router()

router.get('/files', FileController.getAll)
router.get('/files/:id', FileController.getById)
router.post('/files', FileController.create)
router.put('/files/:id', FileController.update)
router.delete('/files/:id', FileController.deleteById)

export default router
