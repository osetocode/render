import {} from "./components/navbar.js"
import { toast } from "./toast.js"

const btn = document.getElementById('btnCopyLinks')

const link = 'https://oseto.onrender.com/linksAPI'

// LISTENERS

btn.addEventListener('click', () => copyText(link))

// FUNCIONES EXTRA

function copyText(text, message = 'Texto copiado en el portapeles') {
  
  try{
    navigator.clipboard.writeText(text)
  }catch(error){
    console.error(error)
  }
  toast(undefined, message)

}