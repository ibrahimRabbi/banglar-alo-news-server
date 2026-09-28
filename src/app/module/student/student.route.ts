import { Router } from "express";
import { createStudentController, deleteStudentController, geStudentController, getAllstudentController } from "./student.controller";

export const studentRoute = Router()

studentRoute.post('/create-student', createStudentController)
studentRoute.get('/get-all-student', getAllstudentController)
studentRoute.get('/get-student/:id',geStudentController)
studentRoute.delete('/delete-student/:id', deleteStudentController)