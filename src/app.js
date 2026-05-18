import express, { json } from 'express'
import cors from 'cors'

import pool from './supabase.js'
import listsApi from './router/lists.api.routes.js'
import notesApi from './router/notes.api.routes.js'
import pages from './router/pages.routes.js'

import { keepAliveServer } from './utils/wakeUp.js'

import { PORT , ENVIRONMENT} from './config.js'

// SET ==================================================

const app = express()

app.use(express.json())
app.use(cors())

// ROUTES ===============================================

// apis
app.use('/api', listsApi)
app.use('/api', notesApi)

// paginas
app.use('/', pages)

// 404
app.use('/', (req, res) => {
  res.send('Ruta no encontrada')
})

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