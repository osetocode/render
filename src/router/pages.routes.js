import express , { Router } from "express";
import {root} from '../config.js'
import path from 'path'

const router = Router()

// sitios estaticos
router.use(express.static(path.join(root,'static')))

// pagina principal
router.get('/',(req,res)=>{
  res.sendFile(path.join(root,'pages','index.html'))
})

// paginas
router.get('/dashboard',(req,res)=>{
  res.sendFile(path.join(root,'pages','panelAdmin.html'))
})


export default router