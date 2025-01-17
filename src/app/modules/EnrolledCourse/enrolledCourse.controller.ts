import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Student is enrolled successfully',
    data: result,
  });
});

const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await EnrolledCourseServices.getMyEnrolledCoursesFromDB(
    userId,
    req.query
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Enrolled courses are retrivied succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateEnrolledCourse = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await EnrolledCourseServices.updateEnrolledCourseIntoDB(
    userId,
    req.body
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Marks is updated successfully',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  getMyEnrolledCourses,
  updateEnrolledCourse,
};
