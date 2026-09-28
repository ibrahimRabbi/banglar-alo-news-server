import status from "http-status";
import { courseModel } from "./course.model";
import { TCourse } from "./course.interface";
import { catchAsync } from "../../helper/catchAsync";
import { RequestHandler } from "express";

export const createCourseController: RequestHandler = catchAsync(async (req, res) => {
        const { course_name, course_code } = req.body;

        // Check duplicate course code
        const existingCourseCode = await courseModel.findOne({
            course_code,
            isDeleted: false,
        });

        if (existingCourseCode) {
            throw new Error("This course code is already in exist");
        }

        // Check duplicate course name
        const existingCourseName = await courseModel.findOne({
            course_name: {
                $regex: new RegExp(`^${course_name}$`, "i"),
            },
            isDeleted: false,
        });

        if (existingCourseName) {
            throw new Error("This course already exists");
        }

        const data: Partial<TCourse> = {
            ...req.body,
            status: "active",
            isDeleted: false,
        };

        const createdCourse = await courseModel.create(data);

        res.status(status.CREATED).json({
            status: status.CREATED,
            success: true,
            message: "Course created successfully",
            data: createdCourse,
        });
    }
);

export const getAllCoursesController: RequestHandler = catchAsync(
    async (req, res) => {
        const courses = await courseModel.find({
            isDeleted: false,
        });

        res.status(status.OK).json({
            status: status.OK,
            success: true,
            message: "Courses retrieved successfully",
            data: courses,
        });
    }
);

export const getSingleCourseController: RequestHandler = catchAsync(async (req, res) => {
        const { id } = req.params;

        const course = await courseModel.findOne({
            _id: id,
            isDeleted: false,
        });

        if (!course) {
            throw new Error("Course not found");
        }

        res.status(status.OK).json({
            status: status.OK,
            success: true,
            message: "Course retrieved successfully",
            data: course,
        });
    }
);

export const deleteCourseController: RequestHandler = catchAsync(async (req, res) => {
        const { id } = req.params;

        const deletedCourse = await courseModel.findByIdAndDelete(id);

        if (!deletedCourse) {
            throw new Error("Course not found");
        }

        res.status(status.OK).json({
            status: status.OK,
            success: true,
            message: "Course deleted successfully",
            data: deletedCourse,
        });
    }
);