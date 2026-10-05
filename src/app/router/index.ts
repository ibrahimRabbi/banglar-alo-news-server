import { Router } from "express";
import { centerRoute } from "../module/center/center.route";
import { mentorRoute } from "../module/mentor/mentor.route";
import { studentRoute } from "../module/student/student.route";
import { courseRoute } from "../module/course/course.route";
import { authRoute } from "../module/auth/auth.route";
 

export const router = Router()

router.use('/center', centerRoute)
router.use('/mentor', mentorRoute)
router.use('/student', studentRoute)
router.use('/course', courseRoute)
router.use('/auth', authRoute)





router.get('/', (req, res) => {
    res.json({ title: 'this is server entry point' })
})



