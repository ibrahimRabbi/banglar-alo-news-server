export type TCourse = {
    course_name: string;
    course_code: number;
    description?: string;
    category?: string;
    duration: number;
    duration_unit: "days" | "weeks" | "months";
    course_fee: number;
    status: "active" | "inactive";
    isDeleted: boolean;
};