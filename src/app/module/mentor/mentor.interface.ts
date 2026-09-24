import { Types } from "mongoose";

export type Tmentor = {
    mentor_id: string;
    mentor_name: string;
    mentor_email: string;
    mentor_phone: string;
    mentor_image?: string;
    designation: string;
    specialization: string[];
    experience_years: number;
    qualification: string;
    center_id: Types.ObjectId;
    isDeleted?: boolean;
};