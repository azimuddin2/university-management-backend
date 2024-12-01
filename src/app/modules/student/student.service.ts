import { TStudent } from './student.interface';
import Student from './student.model';

const getAllStudentsFromDB = async (): Promise<TStudent[]> => {
  const students: TStudent[] = await Student.find();

  if (!students || students.length === 0) {
    throw new Error('No students found');
  }

  return students;
};

const getSingleStudentFromDB = async (id: string): Promise<TStudent | null> => {
  const student = await Student.findOne({ id });

  if (!student) {
    throw new Error(`Student ID ${id} does not exists.`);
  }

  return student;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
