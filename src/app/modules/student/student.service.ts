import { TStudent } from './student.interface';
import Student from './student.model';

const createStudentIntoDB = async (student: TStudent) => {
  const filter = { email: student.email };
  const studentExists = await Student.exists(filter);

  if (studentExists) {
    throw new Error(`${student.email} already exists`);
  }

  const newStudent = await Student.create(student);

  return newStudent;
};

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
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
