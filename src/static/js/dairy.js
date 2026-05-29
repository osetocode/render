// PENDIENTES

// - crear botón finish day (para que marque como rojo todo lo que no se cumplió en el día)
// - manejar la lógica del día (que reset() use una función para detectar el día y renovarlo, también poder modificarlo a mano)
// - incluir comidas del día
// - incluir notas diarias
// - incluir actividades extra

// =========== ELEMENTOS HTML Y VARIABLES GLOBALES
let dataState

const btnResetDay = document.getElementById('resetDay')
const btnPrintDatastate = document.getElementById('printDataState')
const activities = document.querySelector('.activities-container')

// =========== LISTENERS =================================
btnResetDay.addEventListener('click', reset)

activities.addEventListener('click', (e)=>{

  const target = e.target

  if (target.tagName != 'BUTTON') return 

  const pather = target.closest('.activitie')
  const id = pather.dataset.id

  if (target.classList.contains('activitie__button--null')) setActivitieClass('null')
  if (target.classList.contains('activitie__button--done')) setActivitieClass('done')
  if (target.classList.contains('activitie__button--pending')) setActivitieClass('pending')
  
  function setActivitieClass(newClassName){
    pather.className = `activitie activitie--${newClassName}`
    dataState[id].status = newClassName
  }
  
  try{
    putActivities(dataState)
  }catch(error){
    console.error(error)
  }

})

btnPrintDatastate.addEventListener('click',printDataState)

// =========== FUNCIONES PROVISIONALES ====================

function printDataState(){
  console.log('imprimiendo data state')
  console.log(dataState)
}

// =========== FUNCIONES =================================

async function init(){
  const data = await getActivities()
  dataState = data
  renderAll()
}

async function reset(){

  // realmente deberíamos abrir un modal de confirmación

  const data = await getTemplateDay()
  const resOk = await putActivities(data)

  if(resOk){
    dataState = data
    renderAll()
  }else{
    console.log('hubo una falla en la peticion put')
    return
  }
}

// =========== FUNCIONES DE RENDERIZADO ==================

function renderAll(){

  if(!dataState) return console.log('fallo Render All') //hay que colocar toogle de error

  console.log('renderizando...')
  paintData(dataState)
}

function paintData(data) {

  const fragment = document.createDocumentFragment()
  
  // creamos un document fragment
  data.forEach((element,index) => {
    // dependiendo del "type" del objeto crearemos un tipo de elemento html
    // BOOLEAN: tarea hecho o no
    // TEXT: para que este completa la tarea hay que detallar que se hizo
    // NOTES: basicamente un array con notas del dia (o periodo)
    
    if(element.type == 'boolean'){
      const xdd = newActivitie(index,element.name,element.status)
      fragment.appendChild(xdd)
    }
  })
  
  activities.replaceChildren(fragment)
}

function newActivitie(index,name,status){

  const element = document.createElement('div')

  element.className = `activitie activitie--${status}`
  element.dataset.id = index

  element.innerHTML = `
    <p>${name}</p>
    <div class="activitie__buttons">
      <button class="activitie__button activitie__button--done">
        <i class="bi bi-check"></i>
      </button>
      <button class="activitie__button activitie__button--null">
        <i class="bi bi-chevron-bar-contract"></i>
      </button>
      <button class="activitie__button activitie__button--pending">
        <i class="bi bi-x"></i>
      </button>
    </div>
  `
  return element
}

// =========== FUNCIONES FETCH ============================

async function getTemplateDay(){
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

  try{
    const res = await fetch('api/activities/daily',{
      method: 'PUT',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    })

    return res.ok

  }catch{
    console.error('hubo error')
    return false
  }
  
}

// =========== INICIO DE APP ===============================

init()