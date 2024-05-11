import { PrismaClient } from '@prisma/client';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';
import {sendToken} from '../utils/jwtToken.js';

const prisma = new PrismaClient();

const getJWTToken = (user) => {
  const secretKey = 'your_secret_key_here';
  const token = jwt.sign({ id: user.id }, secretKey, {
    expiresIn: '30d', 
  });
  return token;
};

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler('User Avatar Required!', 400));
  }
  const { avatar } = req.files;
  const allowedFormats = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];
  if (!allowedFormats.includes(avatar.mimetype)) {
    return next(new ErrorHandler('Please provide avatar in png, jpg, webp, or avif format!', 400));
  }

  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return next(new ErrorHandler('Please fill full form!', 400));
  }
  let existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return next(new ErrorHandler('User already exists!', 400));
  }
  const cloudinaryResponse = await cloudinary.v2.uploader.upload(avatar.tempFilePath);


  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone : phone,
      password : hashedPassword,
      avatarPublicId: cloudinaryResponse.public_id,
      avatarUrl: cloudinaryResponse.secure_url,
    },
  });

  
  const token = getJWTToken(user);

  sendToken("User Registered!", user, res, 200, token);

});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler('Please provide email and password!', 400));
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return next(new ErrorHandler('Invalid email or password!', 400));
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password!', 400));
  }
  const token = getJWTToken(user);

  sendToken("User Registered!", user, res, 200, token);
  

});

export const logout = catchAsyncErrors((req, res, next) => {
  res
    .status(200)
    .cookie('token', '', {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: 'User Logged Out!',
    });
});

export const myProfile = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  res.status(200).json({
    success: true,
    user,
  });
});


export const deleteProfile = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;

  // Delete all tasks associated with the user
  await prisma.task.deleteMany({
    where: { createdBy: userId },
  });

  // Delete the user
  await prisma.user.delete({
    where: { id: userId },
  });

  // Clear the token cookie
  res
    .status(200)
    .cookie('token', '', {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: 'User profile deleted successfully!',
    });
});



