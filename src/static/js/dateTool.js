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

export function formatTime(time){
  // Parametro esperado en formato : '15:45' << Ejemplo 
  if (!time) {
    console.log('No paso el parámetro, formato de parametro: "18:35"')
    return
  }

  let extra = 'a'
  let [hour,minut] = time.split(':').map(Number)

  if(String(minut).length == 1) minut = '0' + minut
  
  if(hour >= 12){

    if(hour !== 12){
      hour += -12
    } 
    extra = 'p'
  }

  const format = `${hour}:${minut} ${extra}.m`

  return format 


}