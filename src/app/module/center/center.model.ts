import { Schema, model } from "mongoose";
import { Tcenter } from "./center.interface";
import { districts, divisions } from "../../utils/bangladeshMap";

const centerSchema = new Schema<Tcenter>(
    {
        center_id: {
            type: String,
            required: [true, 'Center ID is required'],
            unique: true,
        },
        center_name: {
            type: String,
            required: [true, 'Center name is required'],
            trim: true,
        },
        sub_area: {
            type: String,
            required: [true, 'Sub-area is required'],
            trim: true,
        },
        district: {
            type: String,
            required: [true, 'District is required'],
            enum: {
                values: [...districts],
                message: '{VALUE} is not a valid district',
            },
            trim: true,
        },
        division: {
            type: String,
            required: [true, 'Division is required'],
            enum: {
                values: [...divisions],
                message: '{VALUE} is not a valid division',
            },
            trim: true,
        },
        center_address: {
            type: String,
            required: [true, 'Center address is required'],
            trim: true,
        },
        center_email: {
            type: String,
            required: [true, 'Center email is required'],
            trim: true,
        },
        center_phone: {
            type: String,
            required: [true, 'Center phone is required'],
            trim: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
        strict : 'throw',
    }
);

export const centerModel = model<Tcenter>("centers", centerSchema);