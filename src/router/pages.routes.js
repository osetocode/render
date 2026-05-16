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

const xd = {
  "getN": "https://oseto.onrender.com/api/notes",
  "postN": "https://oseto.onrender.com/api/note",
  "putN": "https://oseto.onrender.com/api/note/",
  "deleteN": "https://oseto.onrender.com/api/note/",
  "getL": "https://oseto.onrender.com/api/lists",
  "postL": "https://oseto.onrender.com/api/list",
  "putL": "https://oseto.onrender.com/api/list/",
  "deleteL": "https://oseto.onrender.com/api/list/"
}

router.get('/links',(req,res)=>{
  res.json(xd)
})


export default router