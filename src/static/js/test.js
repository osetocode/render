import {} from './components/navbar.js'
import { inputModal , modalConfirm , loginModal} from './components/modal.js'

const buttons = document.getElementById('buttons')

buttons.addEventListener('click',(e)=>{
  if (e.target.tagName !== 'BUTTON') return

  if (e.target.textContent == 'confirm'){
    modalConfirm()
  } 
  if (e.target.textContent == 'input'){
    inputModal()
  } 
  if (e.target.textContent == 'login'){
    loginModal()
  } 
})