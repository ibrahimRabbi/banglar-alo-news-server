import status from "http-status";
import { mentorModel } from "./mentor.model";
import { catchAsync } from "../../helper/catchAsync";
import { RequestHandler } from "express";
import { Tmentor } from "./mentor.interface";
import { generateCenterId } from "../../utils/centerIdGenerator";

export const createMentorController: RequestHandler = catchAsync(async (req, res, next) => {
    const checkBefore = await mentorModel.findOne({
        $or: [
            { mentor_email: req.body.mentor_email },
            { mentor_phone: req.body.mentor_phone },
        ]
    });

    if (checkBefore) {
        return next(new Error('Mentor with this email or phone number already exists'));
    }

    const data:Tmentor = {
        mentor_id: generateCenterId(req.body?.mentor_name),
         ...req.body,
     }
    const mentor = await mentorModel.create(data);

    res.status(status.CREATED).json({
        status: status.CREATED,
        success: true,
        message: 'Mentor created successfully',
        data: mentor,
    });

});

export const getMentorController: RequestHandler = catchAsync(async (req, res, next) => {
     

    if (!req.params.mentor_id) {
        return next(new Error('Mentor ID is required'));
    }

    const mentor = await mentorModel.findById(req.params.mentor_id).populate('center_id', 'center_name district division sub_area');

    if (!mentor) {
        return next(new Error('Mentor not found'));
    }

    res.status(status.OK).json({
        status: status.OK,
        success: true,
        message: 'Mentor retrieved successfully',
        data: mentor,
    });

});

export const getAllMentorsController: RequestHandler = catchAsync(async (req, res, next) => {

    const mentors = await mentorModel.find({isDeleted:{ $ne: true }}).populate('center_id', 'center_name district division sub_area');

    res.status(status.OK).json({
        status: status.OK,
        success: true,
        message: 'Mentors retrieved successfully',
        data: mentors,
    });

});

export const deleteMentorController: RequestHandler = catchAsync(async (req, res, next) => {

    const mentors = await mentorModel.findByIdAndUpdate(
        req.params.mentor_id,
        { isDeleted: true },
        { new: true, runValidators: true, context: 'query' }
    ).populate('center_id', 'center_name district division sub_area');

    res.status(status.OK).json({
        status: status.OK,
        success: true,
        message: 'Mentor deleted successfully',
        data: mentors,
    });

});

      