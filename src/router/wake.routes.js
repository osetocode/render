import { wakeServer } from '../utils/wakeUp.js'

import { Router } from 'express'

const router = Router()

// AUXILIARES =================================
const interval = 1000
const sleep = (ms)=>{
  return new Promise(resolve => setTimeout(resolve,ms))
} 

// RUTAS ======================================

router.get('/wakeUp', (req, res) => {
  wakeServer()
  res.sendStatus(204)

  // en realidad esto debería decirnos cuanto tiempo estará prendido el servidor
})

// aun falta validar si es un número
router.get('/wakeUp/:id', async (req, res) => {
  const { id } = req.params

  for (let i = 0; i < id; i++) {
      await sleep(interval)
      wakeServer()
  }

  res.sendStatus(200)
})


export default router