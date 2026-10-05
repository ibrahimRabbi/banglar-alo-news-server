import { Schema, model, models } from 'mongoose'
import bcrypt from 'bcrypt'
import { Tauth } from './auth.interface'

 

const authSchema = new Schema<Tauth>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters'],
            validate: {
                validator: function (this: any, value: string) {
                    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
                    if (!this.isModified('password')) return true
                    return PASSWORD_REGEX.test(value)
                },
                message:
                    'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
            },
            select: false,
        },
        role: {
            type: String,
            enum: ['admin', 'super-admin'],
            default: 'admin',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

// Hash password before saving
authSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Hide deleted users from find queries
authSchema.pre(/^find/, function (next) {
    (this as any).where({ isDeleted: { $ne: true } })
    next()
})

// Prevent model re-compilation in dev (hot reload)
export const authMOdel =  model<Tauth>('users', authSchema)