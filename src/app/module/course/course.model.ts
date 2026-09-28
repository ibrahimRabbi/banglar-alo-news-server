import { Schema, model } from "mongoose";
import { TCourse } from "./course.interface";
import { courseCategories, courseCodes } from "../../utils/courseDetails";

const courseSchema = new Schema<TCourse>(
    {
        course_name: {
            type: String,
            required: [true, "Course name is required"],
            trim: true,
            minlength: [2, "Course name must be at least 2 characters"],
            maxlength: [150, "Course name cannot exceed 150 characters"],
        },
        course_code: {
            type: Number,
            required: [true, "Course code is required"],
            enum: {
                values: courseCodes,
                message: '{VALUE} is invalid course code'
            }
        },

        description: {
            type: String,
            trim: true,
            maxlength: [1000, "Description cannot exceed 1000 characters"],
        },

        category: {
            type: String,
            enum: {
                values: courseCategories,
                message: '{VALUE} is invalid category'
            },
        },

        duration: {
            type: Number,
            required: [true, "Course duration is required"],
            min: [1, "Course duration must be at least 1"],
        },

        duration_unit: {
            type: String,
            required: [true, "Duration unit is required"],
            enum: {
                values: ["days", "weeks", "months"],
                message: "{VALUE} is not a valid duration unit",
            },
        },

        course_fee: {
            type: Number,
            required: [true, "Course fee is required"],
            min: [0, "Course fee cannot be negative"],
        },

        status: {
            type: String,
            enum: {
                values: ["active", "inactive"],
                message: "{VALUE} is not a valid course status",
            },
            default: "active",
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const courseModel = model<TCourse>("courses", courseSchema);