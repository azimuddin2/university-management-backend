import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import Student from '../student/student.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourse } from './enrolledCourse.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { calculateGradeAndPoints } from './enrolledCourse.utils';
import QueryBuilder from '../../builder/QueryBuilder';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse
) => {
  const { offeredCourse } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(404, 'Offered Course not found!');
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(400, 'Room is full!');
  }

  const student = await Student.findOne({ id: userId }, { _id: 1 });

  if (!student) {
    throw new AppError(404, 'Student not found!');
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(409, 'Student is already enrolled!');
  }

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);

  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExists.semesterRegistration
  ).select('maxCredit');

  const maxCredit = semesterRegistration?.maxCredit;

  const course = await Course.findById(isOfferedCourseExists.course);
  const currentCredits = course?.credits;

  // total enrolled credits + new enrolled course credit > maxCredit
  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;

  if (
    totalCredits &&
    maxCredit &&
    totalCredits + currentCredits > semesterRegistration?.maxCredit
  ) {
    throw new AppError(400, 'You have exceeded maximum number if credits!');
  }

  const newEnrolledCourseData = {
    semesterRegistration: isOfferedCourseExists.semesterRegistration,
    academicSemester: isOfferedCourseExists.academicSemester,
    academicFaculty: isOfferedCourseExists.academicFaculty,
    academicDepartment: isOfferedCourseExists.academicDepartment,
    offeredCourse: offeredCourse,
    course: isOfferedCourseExists.course,
    student: student._id,
    faculty: isOfferedCourseExists.faculty,
    isEnrolled: true,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await EnrolledCourse.create([newEnrolledCourseData], {
      session,
    });

    if (!result) {
      throw new AppError(400, 'Failed to enroll in this course!');
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(
      offeredCourse,
      {
        maxCapacity: maxCapacity - 1,
      },
      { new: true }
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getMyEnrolledCoursesFromDB = async (
  userId: string,
  query: Record<string, unknown>
) => {
  const student = await Student.findOne({ id: userId });

  if (!student) {
    throw new AppError(404, 'Student not found!');
  }

  const enrolledCourseQuery = new QueryBuilder(
    EnrolledCourse.find({ student: student._id }).populate(
      'semesterRegistration academicSemester academicFaculty academicDepartment offeredCourse course student faculty'
    ),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await enrolledCourseQuery.modelQuery;
  const meta = await enrolledCourseQuery.countTotal();

  return {
    meta,
    result,
  };
};

const updateEnrolledCourseIntoDB = async (
  userId: string,
  payload: Partial<TEnrolledCourse>
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(404, 'Semester registration not found!');
  }

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(404, 'Offered Course not found!');
  }

  const isStudentExists = await Student.findById(student);
  if (!isStudentExists) {
    throw new AppError(404, 'Student not found!');
  }

  const faculty = await Faculty.findOne({ id: userId }, { _id: 1 });
  if (!faculty) {
    throw new AppError(404, 'Faculty not found!');
  }

  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty._id,
  });

  if (!isCourseBelongToFaculty) {
    throw new AppError(403, 'You are forbidden!');
  }

  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  };

  if (courseMarks?.finalTerm) {
    const { classTest1, classTest2, midTerm, finalTerm } =
      isCourseBelongToFaculty.courseMarks;

    const totalMarks =
      Math.ceil(classTest1 * 0.1) +
      Math.ceil(midTerm * 0.3) +
      Math.ceil(classTest2 * 0.1) +
      Math.ceil(finalTerm * 0.5);

    const result = calculateGradeAndPoints(totalMarks);

    modifiedData.grade = result.grade;
    modifiedData.gradePoints = result.gradePoints;
    modifiedData.isCompleted = true;
  }

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const result = await EnrolledCourse.findByIdAndUpdate(
    isCourseBelongToFaculty._id,
    modifiedData,
    {
      new: true,
    }
  );

  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  getMyEnrolledCoursesFromDB,
  updateEnrolledCourseIntoDB,
};
