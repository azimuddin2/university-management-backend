import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { TStudent } from './student.interface';
import Student from './student.model';
import User from '../user/user.model';

const getAllStudentsFromDB = async (): Promise<TStudent[]> => {
  const students: TStudent[] = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  if (!students || students.length === 0) {
    throw new AppError(404, 'No students found');
  }

  return students;
};

const getSingleStudentFromDB = async (id: string): Promise<TStudent | null> => {
  const student = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  if (!student) {
    throw new AppError(404, `This student ID ${id} does not exists.`);
  }

  return student;
};

const deleteStudentFromDB = async (id: string) => {

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if(!deletedStudent){
      throw new AppError(400, 'Failed to delete student');
    }

    const deletedUser = await User

  } catch (error) {

  }

};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
