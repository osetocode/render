const weekDays = ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const monthName = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre']

// FUNCIONES A EXPORTAR

export function getFullNameDate(date){

  // Parametro esperado en formato : '2099-03-31' << Ejemplo 
  if(!date){
    console.log('No paso el parámetro, formato de parametro: "2099-03-31"')
    return
  }

  const [year, month, day] = date.split('-').map(Number)
  const newDate = new Date(year, month - 1, day)

  const weekDay = weekDays[newDate.getDay()]
  const dataDay = newDate.getDate()
  const monthDay = monthName[newDate.getMonth()]
  const yearName = newDate.getFullYear()

  // guardar en una constante 
  const fullDayName = `${weekDay}, ${dataDay} de ${monthDay} del ${yearName}`

  return fullDayName
}

export function getActualDate(){

  // con esta función obtenemos la fecha actual en formato: '2099-03-31'

  const now = new Date()

  let day = now.getDate()
  let month = now.getMonth() + 1
  const year = now.getFullYear()

  if (String(day).length == 1) day = '0' + day
  if (String(month).length == 1) month = '0' + month

  const result = `${year}-${month}-${day}`

  return result
}