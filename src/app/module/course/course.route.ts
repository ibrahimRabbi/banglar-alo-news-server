import { Router } from "express";
import { createCourseController, deleteCourseController, getAllCoursesController, getSingleCourseController } from "./course.controller";

export const courseRoute = Router()

courseRoute.post('/create-course', createCourseController)
courseRoute.get('/get-all-course', getAllCoursesController)
courseRoute.get('/get-course/:id', getSingleCourseController)
courseRoute.delete('/:id', deleteCourseController)