import { RequestHandler } from "express";
import { catchAsync } from "../../helper/catchAsync";
import { generateId } from "../../utils/idGenerator";
import { studentModel } from "./student.model";
import { Tstudent } from "./student.interface";
import status from "http-status";

export const createStudentController: RequestHandler = catchAsync(async (req, res) => {
    const studentId = generateId(req?.body?.name)

    const checkBefore = await studentModel.findOne({
        $and: [
            { email: req.body?.email },
            { course_id: req?.body?.course_id },
            { status: 'active' },
            { isDeleted: false }
        ]
    })

    if (checkBefore) {
        throw new Error('this student is currently enrolled of this course')
    }

    const data: Partial<Tstudent> = {
        student_id: studentId,
        ...req?.body,
        enrollment_date: new Date(),
        status: 'active',
        isDeleted: false
    }

    const creatingStudent = await studentModel.create(data)

    res.status(status.CREATED).json({
        status: status.CREATED,
        success: true,
        message: 'student course enrolled successfully',
        data: creatingStudent,
    });


})


export const getAllstudentController: RequestHandler = catchAsync(async (req, res) => {
    const gettingAll = await studentModel.find({ isDeleted: { $ne: true } })
        .populate('course_id', 'course_name course_code')
        .populate('center_id', 'center_id sub_area district division')
         

    res.status(status.OK).json({
        status: status.OK,
        success: true,
        message: 'student retrived successfully',
        data: gettingAll,
    });
})


export const geStudentController: RequestHandler = catchAsync(async (req, res) => {
    const getting = await studentModel.findById(req.params?.id)
        .populate('course_id', 'course_name course_code')
        .populate('center_id', 'center_id sub_area district division')
         


    res.status(status.OK).json({
        status: status.OK,
        success: true,
        message: 'student retrived successfully',
        data: getting,
    });
})

export const deleteStudentController: RequestHandler = catchAsync(async (req, res) => {
    if (!req?.params.id) {
        throw new Error('student id is required')
    }

    const updating = await studentModel.findByIdAndUpdate(req.params.id, { isDeleted: true }, { runValidators: true, new: true, context: 'query' })

    if (!updating) {
        throw new Error('faild to update/delete student')
    }
    res.status(status.OK).json({
        status: status.OK,
        success: true,
        message: 'student updated successfully',
        data: updating,
    });
})