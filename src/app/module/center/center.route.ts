import { Router } from "express";
import { centerCreateController, deleteCenterController, getAllCenterController, getCenterController } from "./center.controller";

export const centerRoute = Router()

centerRoute.post('/create-center', centerCreateController)
centerRoute.get('/get-center/:center_id', getCenterController)
centerRoute.get('/get-all-centers', getAllCenterController)
centerRoute.delete('/delete-center/:center_id', deleteCenterController)