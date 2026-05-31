// PENDIENTES

// - crear botón finish day (para que marque como rojo todo lo que no se cumplió en el día)
// - manejar la lógica del día (que reset() use una función para detectar el día y renovarlo, también poder modificarlo a mano)
// - incluir comidas del día
// - incluir notas diarias
// - incluir actividades extra
// - tal vez añadir a que hora empezó mi día, tal vez ponerle a las actividades la hora en que fue concebida la acción, tal vez poder editar tambien eso manualmente

import { toast } from './toast.js'
import { modalConfirm } from './modal.js'

// =========== ELEMENTOS HTML Y VARIABLES GLOBALES
const icons = {
  "boolean": {
    "icon": "bi-check",
    "button": "done"
  },
  "text": {
    "icon": "bi-pencil-fill",
    "button": "edit"
  }
}

let dataState

const btnResetDay = document.getElementById('resetDay')
const btnPrintDatastate = document.getElementById('printDataState')
const btnFinishDay = document.getElementById('finishDay')
const activities = document.querySelector('.activities-container')

// =========== LISTENERS =================================

activities.addEventListener('click', (e) => {

  const target = e.target

  if (target.tagName != 'BUTTON') return

  const pather = target.closest('.activitie')
  const id = pather.dataset.id

  if (target.classList.contains('activitie__button--null')) setActivitieClass('null')
  if (target.classList.contains('activitie__button--done')) setActivitieClass('done')
  if (target.classList.contains('activitie__button--pending')) setActivitieClass('pending')
  // en este último caso deberíamos abrir un modal, extrayendo el id del pather, si tiene contenido le damos la clase done, si no tiene, le damos la clase null
  if (target.classList.contains('activitie__button--edit')) setActivitieClass('done')

  function setActivitieClass(newClassName) {
    pather.className = `activitie activitie--${newClassName}`
    dataState[id].status = newClassName
  }

  try {
    putActivities(dataState)
  } catch (error) {
    console.error(error)
  }

})

btnResetDay.addEventListener('click', reset)

btnPrintDatastate.addEventListener('click', printDataState)

btnFinishDay.addEventListener('click', finishDay)

// =========== FUNCIONES PROVISIONALES ====================

function printDataState() {
  console.log('imprimiendo data state')
  console.log(dataState)
}

async function finishDay() {
  dataState.forEach(element => {
    if (element.type == 'boolean' && element.status != 'done') element.status = 'pending'
    // agrear logica para los demas tipos

  })

  try {
    await putActivities(dataState)
    renderAll()
  } catch (error) {
    toast(undefined, 'hubo un error inesperado')
    console.error(error)
    return
  }

}
// =========== FUNCIONES =================================

async function init() {
  const data = await getActivities()
  dataState = data
  renderAll()
}

async function reset() {

  const ok = await modalConfirm('¿Quires restablecer la lista?')

  if(!ok) return

  const data = await getTemplateDay()
  const resOk = await putActivities(data)

  if(resOk){
    dataState = data
    renderAll()
  }else{
    console.log('Hubo una falla en la petición del input')
  }
  
}

// =========== FUNCIONES DE RENDERIZADO ==================

function renderAll() {

  if (!dataState) return toast(undefined, 'hubo un error inesperado')

  console.log('renderizando...')
  paintData(dataState)
}

function paintData(data) {

  const fragment = document.createDocumentFragment()

  data.forEach((element, index) => {

    if (element.type == 'boolean' || element.type == 'text') {
      const task = newActivitie(index, element)
      fragment.appendChild(task)
    }

  })

  activities.replaceChildren(fragment)
}

function newActivitie(index, element) {

  const { name, status, type } = element

  const newTask = document.createElement('div')

  newTask.className = `activitie activitie--${status}`
  newTask.dataset.id = index

  newTask.innerHTML = `
    <p>${name}</p>
    <div class="activitie__buttons">
      <button class="activitie__button activitie__button--${icons[type].button}">
        <i class="bi ${icons[type].icon}"></i>
      </button>
      <button class="activitie__button activitie__button--null">
        <i class="bi bi-chevron-bar-contract"></i>
      </button>
      <button class="activitie__button activitie__button--pending">
        <i class="bi bi-x"></i>
      </button>
    </div>
  `
  return newTask
}

// =========== FUNCIONES FETCH ============================

async function getTemplateDay() {
  const res = await fetch('./js/templateDay.json')
  const data = await res.json()

  return data
}

async function getActivities() {
  const res = await fetch('api/activities/daily')
  const data = await res.json()
  return data
}

async function putActivities(data) {

  try {
    const res = await fetch('api/activities/daily', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return res.ok

  } catch {
    console.error('hubo error')
    return false
  }

}

// =========== INICIO DE APP ===============================

init()