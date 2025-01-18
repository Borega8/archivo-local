import express, { json } from 'express'
import cors from 'cors'
import router from '../routes/routes'
import { mkdir } from 'node:fs'
import { BASE_DIR } from '../constants/basedir'

const server = express()
mkdir(BASE_DIR, { recursive: true }, (err) => err)

server.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
server.use(json())
server.use(router)

export default server
