import { Router } from "express";
import { adminSignInController, createAdminController, getAdminController, singleImageUploadController } from "./auth.controller";
import { authentication } from "../../middleware/authentication";
import { placeFile } from "../../helper/fileParser";

export const authRoute = Router()


authRoute.get('/get-admin-profile', authentication, getAdminController)
authRoute.post('/create-admin', authentication, createAdminController)
authRoute.post('/admin-signin', adminSignInController)
authRoute.post('/upload-image', placeFile.single('image'), authentication, singleImageUploadController)