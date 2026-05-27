import pool from '../supabase.js'

import { isNaturalNumber } from '../utils/isNaturalNumber.js'

export const getActivities = async (req, res) => {
  try {
    const { name } = req.params

    if (['daily', 'weekly', 'monthly'].includes(name)) {
      const { data, error } = await pool
        .from('activities')
        .select('*')
        .eq('name', name)

      if (error) return res.status(400).send('Error en la db')

      if (data.length == 0) return res.status(401).send('el recurso no existe')

      return res.json(data[0].info)

    } else {
      return res.status(400).send('Error en la solicitud')
    }

  } catch (error) {
    console.error(error)
    res.status(500).send('Hubo un error inesperado en el servidor')
  }
}

export const putActivities = async (req, res) => {
  try{
    const {name} = req.params
    const {body} = req

    if (!body || !name) return res.sendStatus(400)
  
    const {data,error} = await pool
      .from('activities')
      .update({info:body})
      .eq('name',name)
      .select('*')

    if(error) return res.status(400).send(error)
    if(data.length == 0) return res.status(400).send('no existe')

    return res.sendStatus(200)

  }catch(error){
    console.error(error)
    res.status(500).send('Error inesperado en el servidor')
  }
}