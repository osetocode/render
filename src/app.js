import express, { json } from 'express'
import cors from 'cors'
import pool from './supabase.js'

import listsApi from './router/lists.api.routes.js'
import notesApi from './router/notes.api.routes.js'
import pages from './router/pages.routes.js'
import wake from './router/wake.routes.js'

import { keepAliveServer } from './utils/wakeUp.js'

import { PORT } from './config.js'

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
  res.send('<Ruta no encontrada')
})

// INICIO DE APLICACIÓN =================================

app.listen(PORT, () => {
  console.log('Server on port: ', PORT)
})

keepAliveServer()