import express, { json } from 'express'
import cors from 'cors'
import router from '../routes/routes'
import { mkdir } from 'node:fs'

const server = express()
mkdir(`${process.env.USERPROFILE}/ARCHIVO MUNICIPAL/`, { recursive: true }, (err) => err)

server.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
server.use(json())
server.use(router)

export default server
