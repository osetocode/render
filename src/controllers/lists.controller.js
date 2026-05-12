import pool from '../supabase.js'

import { isNaturalNumber } from '../utils/isNaturalNumber.js'

// ENDPOINTS ==========================================================================

export const getLists = async(req,res)=>{
  const {data,error} = await pool
    .from('lists')
    .select('*')

  if(error) return res.send('hubo un error siñors')

  res.json(data)
}

export const postList = async(req,res)=>{

  const {title} = req.body

  if(!title) return res.status(400).json({message: "El campo 'title' es obligatorio"})

  const {data,error} = await pool
  .from('lists')
  .insert([{title}])

  if(error){
    console.error(error)
    return res.sendStatus(500).json({message: "Error de la db"})
  }else{
    return res.sendStatus(204)
  }

}

export const deleteList = async(req,res)=>{
  const { id } = req.params

  if (!isNaturalNumber(id)) {
    return res.status(400).send('El parametro insetado debe ser un número natural')
  }

  const { data, error } = await pool
    .from('lists')
    .delete()
    .select('*')
    .eq('id', id)

  if (error) {
    return res.status(500).send('Error con relación a la db')
  }

  if (data.length == 0) {
    return res.status(404).send('No se encontró el recurso que quería eliminar')
  }

  res.sendStatus(204)
}

export const putList = async(req,res)=>{

  const { id } = req.params
  const { title } = req.body

  if (!isNaturalNumber(id)) {
    return res.status(400).send('El parametro insetado debe ser un número natural')
  }

  const { data, error } = await pool
    .from('notes')
    .update({ tite })
    .eq('id', id)
    .select()

  if (error) return res.sendStatus(500)

  if (data.length == 0) return res.status(404).json({ message: 'El recurso no existe, o no se modificó ningún campo disponible' })

  res.status(200).json(data)
}