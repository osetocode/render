// este archivo se encarga de ofrecer distintos tipos de modales para poder usar facilmente en toda la página
// con solamente enlazar el archivo ya crearemos el contendor modal y lo insertamos en la página

// crear el contenedor de los toast
const modalContainer = el('div', 'modal-container')

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(modalContainer)
})

// FUNCIONES  DE APOYO =================

function el(tag, styles, content) {
  const element = document.createElement(tag)
  if (styles) element.className = styles
  if (content) element.textContent = content
  return element
}

// FUNCIONES A EXPORTAR ================

export function modalConfirm(question) {

  modalContainer.classList.add('show')

  const ele = el('div', 'modal')

  ele.innerHTML = `
  <p>${question}</p>
  <button>Si</button>
  <button>No</button>
  `

  modalContainer.replaceChildren(ele)

  return new Promise((resolve, reject) => {
    ele.addEventListener('click',(e)=>{
      if(e.target.tagName != 'BUTTON') return

      if (e.target.textContent == 'Si') resolve(true)
      if (e.target.textContent == 'No') resolve(false)

      modalContainer.replaceChildren()
      modalContainer.classList.remove('show')
    })
  })
}