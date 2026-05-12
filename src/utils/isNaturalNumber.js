export const isNaturalNumber = (value) => {
  const num = Number(value) //convierte (trata) de combertir una entrada a numero

  return Number.isInteger(num) && num > 0
}