import { Router } from "express";
import { getNotes , postNote , deleteNote , putNote} from "../controllers/notes.controller.js";

const router = Router()

router.get('/notes',getNotes)
router.post('/note',postNote)
router.delete('/note/:id',deleteNote)
router.put('/note/:id',putNote)

export default router