import { PrismaClient } from '@local/prisma/client'
import { app } from 'electron'
import path from 'path'
import fs from 'fs'

let prismaClient: PrismaClient

export function getDatabasePath() {
  const userDataPath = app.getPath('userData')
  
  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true })
  }

  const dbPath = path.join(userDataPath, 'local.db')
  return dbPath
}

export function initializeDB() {
  const dbUrl = `file:${getDatabasePath()}`

  prismaClient = new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  })

  return prismaClient
}

export const prisma = prismaClient || initializeDB()