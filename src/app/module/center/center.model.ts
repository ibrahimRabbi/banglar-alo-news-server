import { Schema, model } from 'mongoose'
import { Tcenter } from './center.interface'
import { bangladeshLocations, districts, divisions } from '../../utils/bangladeshMap'

const divisionValues = divisions.map((d) => d.toLowerCase())
const districtValues = districts.map((d) => d.toLowerCase())

const centerSchema = new Schema<Tcenter>(
    {
        center_id: {
            type: String,
            required: [true, 'Center ID is required'],
            unique: true,
        },
        center_name: {
            type: String,
            default: 'Banglar Alo IT Institute',
            required: [true, 'Center name is required'],
            trim: true,
        },
        division: {
            type: String,
            required: [true, 'Division is required'],
            lowercase: true,
            trim: true,
            enum: {
                values: divisionValues,
                message: '{VALUE} is not a valid division',
            },
        },
        district: {
            type: String,
            required: [true, 'District is required'],
            lowercase: true,
            trim: true,
            enum: {
                values: districtValues,
                message: '{VALUE} is not a valid district',
            },
        },
        sub_area: {
            type: String,
            required: [true, 'Sub-area is required'],
            lowercase: true,
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
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
        },
        center_phone: {
            type: String,
            required: [true, 'Center phone is required'],
            trim: true,
            match: [/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'],
        },
        center_images: {
            type: [String],
            default: [],
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, strict: 'throw' }
)



// 2) Make sure division -> district -> sub_area actually belong together
centerSchema.pre('validate', function (next) {
    const div = bangladeshLocations.find((d) => d.name.toLowerCase() === this.division)
    const dist = div?.districts.find((d) => d.name.toLowerCase() === this.district)

    if (this.division && this.district && !dist) {
        this.invalidate('district', `${this.district} does not belong to ${this.division} division`)
    } else if (dist && this.sub_area && !dist.subAreas.some((s) => s.toLowerCase() === this.sub_area)) {
        this.invalidate('sub_area', `${this.sub_area} is not a valid sub-area of ${this.district}`)
    }
    next()
})

export const centerModel = model<Tcenter>('centers', centerSchema)