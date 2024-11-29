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

const getAllStudentsFromDB = async (): Promise<Student[]> => {
  const students: Student[] = await StudentModel.find();

  if (!students || students.length === 0) {
    throw new Error('No students found');
  }

  return students;
};

const getSingleStudentFromDB = async (id: string): Promise<Student | null> => {
  const student = await StudentModel.findOne({ id });

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
