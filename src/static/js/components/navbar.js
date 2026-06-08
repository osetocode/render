import { inputModal } from './modal.js'

const nav = document.querySelector('nav')


nav.addEventListener('click',async (e)=>{
  if (e.target.tagName !== 'BUTTON') return

  if(e.target.classList.contains('btnLogIn')) {

    try{
      const userKey = await inputModal()
      if(!userKey) return

      const res = await logIn({
          userKey
      })

      if(!res.ok){
        return console.log('fallo en la autorizacion')
        // ya vere que hacer si es que falla la autorización
      }

      if(res.ok) location.reload()

    }catch(error){
      console.log(error)
    }

  }

  if(e.target.classList.contains('btnLogOut')){
    try{
      console.log('nto logoust')
      await logOut()
      location.reload()
    }catch(error){
      console.log(error)
    }
  }
})

async function logIn(data){
  // hay que enviar un objeto con la propiedad userKey
  const response = await fetch('/login',{
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify(data)
    })
    
  return response
}

async function logOut(){
  await fetch('/logout',{
    method: 'POST'
  })
}