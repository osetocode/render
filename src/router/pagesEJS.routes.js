import express , { Router } from "express";
import {root} from '../config.js'
import path from 'node:path'

const router = Router()

// paginas

router.get('/',(req,res)=>{
  res.render('index')
})

router.get('/dairy-activities',(req,res)=>{
  res.render('dairy-activities')
})

router.get('/links',(req,res)=>{
  res.render('links')
})

router.get('/test',(req,res)=>{
  res.render('test')
})

export default router