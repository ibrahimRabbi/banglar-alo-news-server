import { Types } from "mongoose";

export type Tstudent = {
    student_id: string;
    course_id: Types.ObjectId;
    center_id: Types.ObjectId;
    enrollment_date: Date;
    // batch_id?: string;
    name: string;
    father_name: string;
    mother_name: string;
    dateOfBirth: Date;
    gender: "Male" | "Female" | "Other";
    email?: string;
    phone: string;
    alternate_phone?: string;
    present_address: string;
    permanent_address: string;
    status: "active" | "completed" | "dropped" | "suspended";
    isDeleted: boolean;
};