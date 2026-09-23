import { Router } from "express";
import { centerRoute } from "../module/center/center.route";
 

export const router = Router()

router.use('/center', centerRoute)





router.get('/', (req, res) => {
    res.json({ title: 'this is server entry point' })
})



