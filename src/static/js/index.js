const link = 'https://oseto.onrender.com/links'

// LISTENERS

const btn = document.getElementById('btnCopyLinks')
btn.addEventListener('click', () => {
  copyMamada(link)
})

async function copyMamada(text) {
  await navigator.clipboard.writeText(text)
  // esto eventualmente hay que cambiarlo por un toast o algo así
  alert('Texto Copiado')
}