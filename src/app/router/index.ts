import { Router } from "express";
import { centerRoute } from "../module/center/center.route";
import { mentorRoute } from "../module/mentor/mentor.route";
 

export const router = Router()

router.use('/center', centerRoute)
router.use('/mentor', mentorRoute)





router.get('/', (req, res) => {
    res.json({ title: 'this is server entry point' })
})



