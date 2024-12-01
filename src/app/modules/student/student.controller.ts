import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const getAllStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      data: result,
    });
  } catch (error: unknown) {
    const err = error as Error;

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve students',
      err: err,
      stack: err.stack,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (error: unknown) {
    const err = error as Error;

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve student',
      err: err,
      stack: err.stack,
    });
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
};
