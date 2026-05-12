import express, { json } from 'express'
import pool from './supabase.js'

import listsApi from './router/lists.api.routes.js'
import notesApi from './router/notes.api.routes.js'

import { PORT } from './config.js'

// SET ==================================================

const app = express()

app.use(express.json())

// ROUTES ===============================================

app.use(listsApi)
app.use(notesApi)

app.use('/', (req,res) => {
  res.send('<h1>Bienvenidos al Cielo Hijos de Puta</h1>')
})

// INICIO DE APLICACIÓN =================================

app.listen(PORT,()=>{
  console.log('Server on port: ', PORT)
})
