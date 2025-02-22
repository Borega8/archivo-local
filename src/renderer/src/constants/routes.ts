import Config from '@renderer/modules/config'
import { Home } from '@renderer/modules/home'
import { Received } from '@renderer/modules/received'
import { NewReceived } from '@renderer/modules/received/pages/create'
import { EditReceived } from '@renderer/modules/received/pages/edit'
import { Sent } from '@renderer/modules/sent'
import { NewSent } from '@renderer/modules/sent/pages/create'
import { EditSent } from '@renderer/modules/sent/pages/edit'

export enum AppRoutesEnum {
  HOME = '/',
  RECEIVED = '/received',
  SENT = '/sent',
  CONFIG = '/config',

  NEW_RECEIVED = `${RECEIVED}/new`,
  NEW_SENT = `${SENT}/new`,

  EDIT_RECEIVED = `${RECEIVED}/:id`,
  EDIT_SENT = `${SENT}/:id`
}

type AppRoutesType = {
  path: string
  element: () => JSX.Element
}

export const AppRoutes: AppRoutesType[] = [
  { path: AppRoutesEnum.HOME, element: Home },
  { path: AppRoutesEnum.RECEIVED, element: Received },
  { path: AppRoutesEnum.SENT, element: Sent },
  { path: AppRoutesEnum.CONFIG, element: Config },
  { path: AppRoutesEnum.NEW_RECEIVED, element: NewReceived },
  { path: AppRoutesEnum.NEW_SENT, element: NewSent },
  { path: AppRoutesEnum.EDIT_RECEIVED, element: EditReceived },
  { path: AppRoutesEnum.EDIT_SENT, element: EditSent }
]

export const SERVER_URL = 'http://localhost:5000'
