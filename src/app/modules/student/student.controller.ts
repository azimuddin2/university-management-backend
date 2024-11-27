import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const handleCreateStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = await StudentServices.createStudentIntoDB(studentData);

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Product creation failed',
      error: err,
      stack: err.stack,
    });
  }
};

export const StudentControllers = {
  handleCreateStudent,
};
