// PENDIENTES

// - poder sobreescribir la info de las actividades de tipo text (prioridad alta)
// - incluir comidas del día (prioridad media/alta)
// - incluir actividades extra (prioriad media)
// - incluir notas diarias (prioriad media/baja)
// - añadir al reset la hora de iniciado al dia (prioridad baja)

import { toast } from './toast.js'
import { modalConfirm } from './modal.js'
import { getFullNameDate , getActualDate} from './dateTool.js'

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
const dateFull = document.querySelector('.dateFull')

const inputDate = document.querySelector('input[type="date"]')

// =========== LISTENERS =================================

activities.addEventListener('click', (e) => {

  const target = e.target

  if (target.tagName != 'BUTTON') return

  const pather = target.closest('.activitie')
  const id = pather.dataset.id

  if (target.classList.contains('activitie__button--null')) setActivitieClass('null')
  if (target.classList.contains('activitie__button--done')) setActivitieClass('done')
  if (target.classList.contains('activitie__button--pending')) setActivitieClass('pending')
  // en este último caso deberíamos abrir un modal, extrayendo el id del pather,
  // si tiene contenido le damos la clase done, si no tiene, le damos la clase null
  // para ello primero trabajaremos en el modulo modal: edit input (retorna una promesa)
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

inputDate.addEventListener('change',(e)=>{

  const dayState = dataState.find(item => item.type === 'day')
  dayState.date = e.target.value

  printDateinputFormat(e.target.value)
  putActivities(dataState)
})

// =========== FUNCIONES DE APOYO ====================

function printDateinputFormat(date){
  dateFull.textContent = getFullNameDate(date)
}

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

  // CONFIRMAMOS LA ACCIÓN CON UN MODAL
  const ok = await modalConfirm('¿Quires restablecer la lista?')
  if(!ok) return

  // OBTENEMOS LA PLANTILLA Y LE ASIGNAMOS LA FECHA ACTUAL
  const data = await getTemplateDay()
  
  const dayState = data.find(item => item.type === 'day')
  dayState.date = getActualDate()
  
  // HACEMOS PUT DE LA PLANTILLA CON LA FECHA ACTUAL
  const resOk = await putActivities(data)

  if(resOk){
    dataState = data
    renderAll()
  }else{
    console.error('Fallo la petición putActivities')
    toast('Hubo un fallo en la aplicación')
  }
  
}

// =========== FUNCIONES DE RENDERIZADO ==================

function renderAll() {

  if (!dataState) return toast(undefined, 'hubo un error inesperado')

  console.log('renderizando...')
  // pintamos las tareas
  paintData(dataState)
  // pintamos las fechas
  const dayState = dataState.find(item => item.type === 'day')
  if(dayState.date) printDateinputFormat(dayState.date)

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