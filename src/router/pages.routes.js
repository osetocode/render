import express , { Router } from "express";
import {ROOT} from '../config.js'
import path from 'path'

const router = Router()

// MIDDLEWHERE =====================

// PAGES ===========================

// sitios estaticos
router.use(express.static(path.join(ROOT,'static')))

// paginas
const linksDirectory = {
  "getN": "https://oseto.onrender.com/api/notes",
  "postN": "https://oseto.onrender.com/api/note",
  "putN": "https://oseto.onrender.com/api/note/",
  "deleteN": "https://oseto.onrender.com/api/note/",
  "getL": "https://oseto.onrender.com/api/lists",
  "postL": "https://oseto.onrender.com/api/list",
  "putL": "https://oseto.onrender.com/api/list/",
  "deleteL": "https://oseto.onrender.com/api/list/"
}

router.get('/linksAPI',(req,res)=>{
  res.json(linksDirectory)
})

router.get('/favicon.ico',(req,res)=>{
  res.sendFile(path.join(ROOT, 'static', 'img','logo-isotipo-claro.svg'))
})

router.use('/', (req, res) => {
  res.status(400).render('404')
})

export default router