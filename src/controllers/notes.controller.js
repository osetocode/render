import pool from '../supabase.js'

import { isNaturalNumber } from '../utils/isNaturalNumber.js'

// ENDPOINTS ==========================================================================

export const getNotes = async (req,res)=>{
  const {data,error} = await pool.
    from('notes').
    select('*')

  if (error){
    return res.send('hubo error pss ctmre')
  }else{
    res.json(data)
  }
}

export const postNote = async (req,res)=>{
  const {content, id_list} = req.body
  
  if (!content) return res.status(400).json({message: "El campo 'content' es obligatorio"})

  const {data,error} = await pool
    .from('notes')
    .insert([{content, id_list}])

  if(error){
    console.error(error)
    res.status(500).json({message: "error interno de servidor"})
  }else{
    res.sendStatus(204)
  }
}

export const deleteNote = async (req,res)=>{

  const {id} = req.params
  
  if(!isNaturalNumber(id)){
    return res.status(400).send('El parametro insetado debe ser un número natural')
  }
  
  const {data,error} = await pool
  .from('notes')
  .delete()
  .select('*')
  .eq('id',id)
  
  if(error){
    return res.status(500).send('Error con relación a la db')
  }
  
  if(data.length == 0){
    return res.status(404).send('No se encontró el recurso que quería eliminar')
  }

  res.sendStatus(204)

}

export const putNote = async (req,res)=>{

  const {id} = req.params
  const {content, id_list} = req.body

  if(!isNaturalNumber(id)){
    return res.status(400).send('El parametro insetado debe ser un número natural')
  }

  const { data, error } = await pool
    .from('notes')
    .update({ content, id_list })
    .eq('id', id)
    .select()

  if (error) return res.sendStatus(500)

  if (data.length == 0) return res.status(404).json({ message: 'El recurso no existe, o no se modificó ningún campo disponible' })

  res.status(200).json(data)

}