import { Schema, model } from "mongoose";
import { Tstudent } from "./student.interface";

const studentSchema = new Schema<Tstudent>(
    {
        student_id: {
            type: String,
            required: [true, "Student ID is required"],
            unique: true,
            trim: true,
            uppercase: true,
        },

        course_id: {
            type: Schema.Types.ObjectId,
            ref: "courses",
            required: [true, "Course ID is required"],
        },
        batch_id: {
            type: String,
            required: [true, "Batch ID is required"],
        },
        // batch_id: {
        //     type: Schema.Types.ObjectId,
        //     ref: "batches",
        //     required: [true, "Batch ID is required"],
        // },

        center_id: {
            type: Schema.Types.ObjectId,
            ref: "centers",
            required: [true, "Center ID is required"],
        },

        enrollment_date: {
            type: Date,
            required: [true, "Enrollment date is required"],
            validate: {
                validator: (value: Date) => {
                    return value <= new Date();
                },
                message: "Enrollment date cannot be in the future",
            },
        },

        name: {
            type: String,
            required: [true, "Student name is required"],
            trim: true,
            minlength: [2, "Student name must be at least 2 characters"],
            maxlength: [100, "Student name cannot exceed 100 characters"],
        },
        image: {
            type: String,
            required: [true, "Student image is required"],
            trim: true,
        },

        father_name: {
            type: String,
            required: [true, "Father name is required"],
            trim: true,
            minlength: [2, "Father name must be at least 2 characters"],
            maxlength: [100, "Father name cannot exceed 100 characters"],
        },

        mother_name: {
            type: String,
            required: [true, "Mother name is required"],
            trim: true,
            minlength: [2, "Mother name must be at least 2 characters"],
            maxlength: [100, "Mother name cannot exceed 100 characters"],
        },

        dateOfBirth: {
            type: Date,
            required: [true, "Date of birth is required"],
            validate: {
                validator: (value: Date) => {
                    return value < new Date();
                },
                message: "Date of birth must be in the past",
            },
        },

        gender: {
            type: String,
            required: [true, "Gender is required"],
            enum: {
                values: ["Male", "Female", "Other"],
                message: "{VALUE} is not a valid gender",
            },
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please provide a valid email address",
            ],
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
            match: [
                /^(?:\+8801|01)[3-9]\d{8}$/,
                "Please provide a valid Bangladesh phone number",
            ],
        },

        alternate_phone: {
            type: String,
            trim: true,
            match: [
                /^(?:\+8801|01)[3-9]\d{8}$/,
                "Please provide a valid Bangladesh phone number",
            ],
        },

        present_address: {
            type: String,
            required: [true, "Present address is required"],
            trim: true,
            minlength: [5, "Present address must be at least 5 characters"],
            maxlength: [300, "Present address cannot exceed 300 characters"],
        },

        permanent_address: {
            type: String,
            required: [true, "Permanent address is required"],
            trim: true,
            minlength: [5, "Permanent address must be at least 5 characters"],
            maxlength: [300, "Permanent address cannot exceed 300 characters"],
        },

        status: {
            type: String,
            required: [true, "Student status is required"],
            enum: {
                values: ["active", "completed", "dropped", "suspended"],
                message: "{VALUE} is not a valid student status",
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

export const studentModel = model<Tstudent>("students", studentSchema);