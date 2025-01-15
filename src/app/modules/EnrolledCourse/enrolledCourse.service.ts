import { TEnrolledCourse } from './enrolledCourse.interface';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse
) => {};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
};
