import path from 'node:path'
import {root,USER_KEY_ADMIN} from '../config.js'

import express , { Router } from "express";

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

// testing auth ==================

const isLogged = (req,res,next)=>{

  req.logged = false
  const {acces_token} = req.cookies
  if (acces_token === 'logged') req.logged = true

  next()
}

router.get('/test',isLogged,(req,res)=>{

  if(req.logged){
    res.render('test',{logged: true})
  }else{
    res.render('test')
  }

})

router.post('/login',(req,res)=>{
  const { userKey} = req.body

  if(userKey !== USER_KEY_ADMIN){
    return res.sendStatus(401)
  }

  return res
    .cookie('acces_token', 'logged',{
      httpOnly: true,
      maxAge: 5 * 60 * 1000
    })
    .send('estas autorizado')

})

router.post('/logout',(req,res)=>{

  res
    .clearCookie('acces_token')
    .sendStatus(200)
}) 

export default router