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







