import { RequestHandler } from "express";
import { catchAsync } from "../../helper/catchAsync";
import { generateId } from "../../utils/idGenerator";
import { centerModel } from "./center.model";
import status from "http-status";

const generateCenterId = async (): Promise<string> => {
    let id: string
    let exists = true

    do {
        id = Math.floor(100000 + Math.random() * 900000).toString()
        exists = !!(await centerModel.exists({ center_id: id }))
    } while (exists)

    return id
}

export const centerCreateController: RequestHandler = catchAsync(async (req, res, next) => {
    const center_id = await generateCenterId();
    const checkBefore = await centerModel.findOne({
        $and: [
            { center_id },
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
        center_id,
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

    if (!req.params.center_id) {
        throw new Error('Center ID is required');
    }

    const centers = await centerModel.findByIdAndDelete(req.params.center_id);


    res.status(status.OK).json({
        status: status.OK,
        success: true,
        message: 'Center deleted successfully',
        data: centers,
    });

});




