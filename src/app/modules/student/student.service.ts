import { Student } from './student.interface';
import StudentModel from './student.model';

const createStudentIntoDB = async (student: Student) => {
  const filter = { email: student.email };
  const studentExists = await StudentModel.exists(filter);

  if (studentExists) {
    throw new Error(`${student.email} already exists`);
  }

  const newStudent = await StudentModel.create(student);

  return newStudent;
};

export const StudentServices = {
  createStudentIntoDB,
};
