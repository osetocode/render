// ESTO SE TRABAJARÁ LUEGO

import { DOMAIN } from '../config.js'

// debería tener un enlace que corra un loop de peticiones a la pagina principal, como parametro el tiempo que demore en correr el loop, cada 3 min debe hacer la peticion


// AUXILIARES ALIVE ============================
const alive = true
const intervalMinutes = 10 * 60 * 1000

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
} 

// ANOTHER THING ===============================

export const wakeServer = async()=> {
  const res = await fetch(DOMAIN)

  if (res.ok) {
    console.log('se prendioel servidor', new Date)
  } else {
    console.log('Hubo un pequeño problema')
  }
  
}

export const keepAliveServer = async()=>{
  
  if(alive){

    while(alive == true){
      wakeServer()
      await sleep(intervalMinutes)
    }

  }
}
