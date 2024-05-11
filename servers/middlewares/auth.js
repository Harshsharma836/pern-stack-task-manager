import { PrismaClient } from '@prisma/client';
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import ErrorHandler from './error.js';

config(); // Load environment variables

const prisma = new PrismaClient();

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User is not authenticated!", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id
      }
    });

    if (!user) {
      return next(new ErrorHandler("User not found!", 400));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token!", 400));
  }
});
