import { RequestHandler } from "express";
import { catchAsync } from "../../helper/catchAsync";
import { authMOdel } from "./auth.model";
import status from "http-status";
import bcrypt from 'bcrypt'
import envData from "../../config";
import jwt from "jsonwebtoken";
import { uploadImage } from "../../helper/imageUploader";

export const createAdminController: RequestHandler = catchAsync(async (req, res, next) => {
     
    const checkBefore = await authMOdel.findOne({ email: req.body.email });
    if (checkBefore) {
        throw new Error('Admin already exists with the same email');
    }

    const data = {
        ...req.body,
        password:  req.body.password || 'BanglarAlo@123' 
    }

    const admin = await authMOdel.create(data);

    res.status(status.CREATED).json({
        status: status.CREATED,
        success: true,
        message: 'Admin created successfully',
        data: admin
    });
});

export const getAdminController: RequestHandler = catchAsync(async (req, res, next) => {
    res.status(status.OK).json({
        status: status.OK,
        success: true,
        message: 'Admin retrieved successfully',
        data: req.user
    });
})

export const adminSignInController: RequestHandler = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const checkExistancy = await authMOdel.findOne({ email }).select('+password');

    if (!checkExistancy) {
        throw new Error('Admin not found');
    }

    const isMatch = await bcrypt.compare(password, checkExistancy.password)

    if (!isMatch) {
        throw new Error('Invalid password');
    }
         

    const credentials = {
        fullName: checkExistancy.name,
        email: checkExistancy.email,
        userId: checkExistancy._id,
        role: checkExistancy.role,
    };

    const accessToken = jwt.sign(credentials, envData.secretKey as string, { expiresIn: '12d' });

    return res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: 'Sign in successfully',
        isExist: true,
        token: accessToken,
    });


    
     
});



export const singleImageUploadController: RequestHandler = catchAsync(async (req, res, next) => {

    if (!req.file?.path) {
        throw new Error('please provide an image')
    }

    const imageNamePrefix = `${req?.user?.name}_${Math.random().toString().split('.')[1]}`;
    const imagePath = req.file.path

    const result = await uploadImage(imagePath, `${imageNamePrefix}`);

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: 'image uploaded successfully',
        data: result.secure_url
    })
});

