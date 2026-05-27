import express , { Router } from "express";
import {root} from '../config.js'
import path from 'path'

const router = Router()

// sitios estaticos
router.use(express.static(path.join(root,'static')))

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

router.get('/links',(req,res)=>{
  res.json(linksDirectory)
})


export default router