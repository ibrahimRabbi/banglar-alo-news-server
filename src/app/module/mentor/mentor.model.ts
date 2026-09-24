import { Schema, model } from "mongoose";
import { Tmentor } from "./mentor.interface";

const mentorSchema = new Schema<Tmentor>(
    {
        mentor_id: {
            type: String,
            required: [true, "Mentor ID is required"],
            unique: true,
            trim: true,
        },

        mentor_name: {
            type: String,
            required: [true, "Mentor name is required"],
            trim: true,
        },

        mentor_email: {
            type: String,
            required: [true, "Mentor email is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },

        mentor_phone: {
            type: String,
            required: [true, "Mentor phone is required"],
            trim: true,
        },

        mentor_image: {
            type: String,
            trim: true,
        },

        designation: {
            type: String,
            required: [true, "Designation is required"],
            trim: true,
        },

        specialization: {
            type: [String],
            required: [true, "Specialization is required"],
            trim: true,
        },

        experience_years: {
            type: Number,
            required: [true, "Experience years is required"],
            min: [0, "Experience years cannot be negative"],
        },

        qualification: {
            type: String,
            required: [true, "Qualification is required"],
            trim: true,
        },

        center_id: {
            type: Schema.Types.ObjectId,
            required: [true, "Center ID is required"],
            ref: "centers",
        },

        isDeleted: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
        strict: 'throw',
    }
);

export const mentorModel = model<Tmentor>("mentors", mentorSchema);