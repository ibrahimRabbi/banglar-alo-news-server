import { Types } from "mongoose";

export type Tstudent = {
    student_id: string;
    course_id: Types.ObjectId;
    center_id: Types.ObjectId;
    // batch_id?: Types.ObjectId;
    batch_id: string;
    enrollment_date: Date;
    name: string;
    image: string;
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