import { Router } from "express";
import { centerCreateController } from "./center.controller";

export const centerRoute = Router()

centerRoute.post('/create-center', centerCreateController)