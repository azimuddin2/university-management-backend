import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    // const validData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: unknown) {
    const err = error as Error;

    res.status(500).json({
      success: false,
      message: 'Student creation failed',
      error: err,
      stack: err.stack,
    });
  }
};

export const UserControllers = {
  createStudent,
};
