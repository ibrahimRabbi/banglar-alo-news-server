import { Router } from "express"
import { createMentorController, deleteMentorController, getAllMentorsController, getMentorController } from "./mentor.controller"

export const mentorRoute = Router()

mentorRoute.post('/create-mentor', createMentorController)
mentorRoute.get('/get-mentor/:mentor_id', getMentorController)
mentorRoute.get('/get-all-mentors', getAllMentorsController)
mentorRoute.delete('/delete-mentor/:mentor_id', deleteMentorController)