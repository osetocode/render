import { Router } from "express";

import { getActivities, putActivities} from "../controllers/activities.controller.js";

const router = Router()

router.get('/activities/:name',getActivities)

router.put('/activities/:name', putActivities)

export default router