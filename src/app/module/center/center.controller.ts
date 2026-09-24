import { RequestHandler } from "express";
import { catchAsync } from "../../helper/catchAsync";
import { generateCenterId } from "../../utils/centerIdGenerator";
import { centerModel } from "./center.model";
import status from "http-status";

export const centerCreateController: RequestHandler = catchAsync(async (req, res, next) => {
    const checkBefore = await centerModel.findOne({
        $and: [
            { center_name: req.body.center_name },
            { district: req.body.district },
            { division: req.body.division },
            { sub_area: req.body.sub_area }
        ]
    });
    if (checkBefore) {
        throw new Error('Center already exists with the same name, district, division, and sub-area');
    }
    const data = {
        ...req.body,
        center_id: generateCenterId(req.body.district),
    };
    const center = await centerModel.create(data);
    
    res.status(status.CREATED).json({
        status: status.CREATED,
        success: true,
        message: 'Center created successfully',
        data: center,
    });

})

export const getCenterController: RequestHandler = catchAsync(async (req, res, next) => {
    const { center_id } = req.params;
    const center = await centerModel.findById(center_id);
    if (!center) {
        throw new Error('Center not found');
    }
    res.status(status.OK).json({
        status: status.OK,
        success: true,
        message: 'Center retrieved successfully',
        data: center,
    });
});

export const getAllCenterController: RequestHandler = catchAsync(async (req, res, next) => {
    const centers = await centerModel.find({ isDeleted: { $ne: true } });
    res.status(status.OK).json({
        status: status.OK,
        success: true,
        message: 'Centers retrieved successfully',
        data: centers,
    });
});

export const deleteCenterController: RequestHandler = catchAsync(async (req, res, next) => {

    if(!req.params.center_id){
        throw new Error('Center ID is required');
    }

    const centers = await centerModel.findByIdAndUpdate(
        req.params.center_id,
        { isDeleted: true },
        { new: true, runValidators: true, context: 'query' }
    );


    res.status(status.OK).json({
        status: status.OK,
        success: true,
        message: 'Center deleted successfully',
        data: centers,
    });

});




