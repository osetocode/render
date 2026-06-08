import { Router } from "express";

// deberiamos proteger esta ruta con el session
import { getActivities, putActivities} from "../controllers/activities.controller.js";

const router = Router()

router.get('/activities/:name',getActivities)

router.put('/activities/:name', putActivities)

export default router