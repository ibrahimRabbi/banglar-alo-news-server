import { Router } from "express";
import { centerCreateController, deleteCenterController, getAllCenterController, getCenterController } from "./center.controller";
import { authentication } from "../../middleware/authentication";

export const centerRoute = Router()

centerRoute.post('/create-center', authentication, centerCreateController)
centerRoute.get('/get-center/:center_id', authentication, getCenterController)
centerRoute.get('/get-all-centers', authentication, getAllCenterController)
centerRoute.delete('/delete-center/:center_id', authentication, deleteCenterController)