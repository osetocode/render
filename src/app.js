import express, { json } from 'express'
import cors from 'cors'
import pool from './supabase.js'

import listsApi from './router/lists.api.routes.js'
import notesApi from './router/notes.api.routes.js'
import pages from './router/pages.routes.js'
import wake from './router/wake.routes.js'

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
app.use('/', wake)

// 404
app.use('/', (req, res) => {
  res.send('Ruta no encontrada')
})

// INICIO DE APLICACIÓN =================================

if(ENVIRONMENT == 'dev'){
  app.listen(PORT, '0.0.0.0',() => {
    console.log('Server on port: ', PORT,)
    console.log("tambien accesible de manera local")
  })
}else{
  app.listen(PORT, () => {
    console.log('Server on port: ', PORT)
  })
}

// Para ver en el móvil usar esta ruta:
// Abrir el cmd: ipconfig => luego buscar la ipconfig el valor de la clave: Dirección IPv4:
// Luego buscar en el móvil 192.168.1.59:3000 (donde la ip es el IPv4, y el último número es el número de puerto)


keepAliveServer()