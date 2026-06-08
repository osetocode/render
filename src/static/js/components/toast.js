// crear el contenedor de los toast
const toastContainer = el('div','toastContainer')

// ahora que lo pienso, en caso existe toast debemos añadir con el mismo js el elemento contenedor de los toast
document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(toastContainer)
})

// FUNCIONES =================

function el(tag, styles, content) {
  const element = document.createElement(tag)
  if (styles) element.className = styles
  if (content) element.textContent = content
  return element
}

// FUNCIONES A EXPORTAR========

export function toast(toastType, message){
  const toast = (el('div', `toast toast--${toastType}`, message))

  toastContainer.appendChild(toast)

  // luego de x tiempo lo eliminamos al toast
  setTimeout(()=>{
    toast.remove()
  },2000)
}
