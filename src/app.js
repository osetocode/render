import path from 'node:path'

import express from 'express'
import cors from 'cors'

import { PORT , ENVIRONMENT , root} from './config.js'

// routes:api
import listsApi from './router/lists.api.routes.js'
import notesApi from './router/notes.api.routes.js'
import activitiesApi from './router/activities.api.routes.js'
// routes:pages
import pages from './router/pages.routes.js'
import pagesEJS from './router/pagesEJS.routes.js'
// extra functions
import { keepAliveServer } from './utils/wakeUp.js'

// SET ==================================================

const app = express()

app.use(express.json())
app.use(cors())

app.set('view engine', 'ejs')
app.set('views',path.join(root,'views'))

// ROUTES ===============================================

// apis
app.use('/api', listsApi)
app.use('/api', notesApi)
app.use('/api', activitiesApi)

// paginas
app.use('/', pagesEJS)
app.use('/', pages) //siempre debe ir al último xq tiene el 404

// INICIO DE APLICACIÓN =================================

const host = ENVIRONMENT === 'dev' ? '0.0.0.0':undefined

app.listen(PORT, host, () => {
  console.log('Server on port: ', PORT)
  if (host) console.log("tambien accesible de manera local")
})

// Para ver en el móvil usar esta ruta:
// Abrir el cmd: ipconfig => luego buscar la ipconfig el valor de la clave: Dirección IPv4:
// Luego buscar en el móvil 192.168.1.59:3000 (donde la ip es el IPv4, y el último número es el número de puerto)

keepAliveServer()