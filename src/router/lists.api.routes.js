import { Router } from "express";

import { getLists , postList , deleteList , putList} from "../controllers/lists.controller.js";

const router = Router()

router.get('/lists',getLists)
router.post('/list',postList)
router.delete('/list/:id',deleteList)
router.put('/list/:id',putList)

export default router