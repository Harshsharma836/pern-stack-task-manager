import { PrismaClient } from '@prisma/client';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';

const prisma = new PrismaClient();

export const createTask = catchAsyncErrors(async (req, res, next) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return next(new ErrorHandler('Title and Description cannot be empty!', 400));
  }

  const createdBy = req.user.id;
  const task = await prisma.task.create({
    data: {
      title,
      description,
      createdBy,
    },
  });
  res.status(200).json({
    success: true,
    task,
    message: 'Task Created',
  });
});

export const deleteTask = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  });
  if (!task) {
    return next(new ErrorHandler('Task not found!', 400));
  }
  await prisma.task.delete({
    where: { id: parseInt(id) },
  });
  res.status(200).json({
    success: true,
    message: 'Task Deleted!',
  });
});

export const updateTask = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  });
  if (!task) {
    return next(new ErrorHandler('Task not found!', 400));
  }
  let {title , description , status , archived} = req.body
  archived = archived === 'true'; // Convert archived to boolean

  task = await prisma.task.update({
    where: { id: parseInt(id) },
    data: {
      title,
      description,
      status,
      archived,
    },
  });

  res.status(200).json({
    success: true,
    message: 'Task Updated!',
    task,
  });
});

export const getMyTask = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;
  const tasks = await prisma.task.findMany({
    where: { createdBy: userId },
  });
  res.status(200).json({
    success: true,
    tasks,
  });
});

export const getSingleTask = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  });
  if (!task) {
    return next(new ErrorHandler('Task not found!', 400));
  }
  res.status(200).json({
    success: true,
    task,
  });
});
