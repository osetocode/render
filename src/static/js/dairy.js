// creamos un endpoint, lo guardamos como objeto, y lo modificamos, solo para lo visual de momento,
// lo creamos manuelmente y el frontend debe de poder modificarlo y en cada modificacion hacer un put del objeto que se guardará como estado
// tambien debemos manejar una logica para designar el dia, y que no se cruce la info

// =========== ELEMENTOS HTML Y VARIABLES GLOBALES
let dataState

const btnResetDay = document.getElementById('resetDay')

// =========== LISTENERS =================================
btnResetDay.addEventListener('click', reset)

// =========== FUNCIONES =================================

async function init(){
  const data = await getActivities()
  dataState = data
  renderAll()
}

async function reset(){
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
  data.forEach(element => {
    // dependiendo del "type" del objeto crearemos un tipo de elemento html
    // BOOLEAN: tarea hecho o no
    // TEXT: para que este completa la tarea hay que detallar que se hizo
    // NOTES: basicamente un array con notas del dia (o periodo)
    console.log(element)
  })
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