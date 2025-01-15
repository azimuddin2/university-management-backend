import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;

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

const updateEnrolledCourse = catchAsync(async (req, res) => {
  const facultyId = req.user.id;

  const result = await EnrolledCourseServices.updateEnrolledCourseIntoDB(
    facultyId,
    req.body
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Student is enrolled successfully',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  updateEnrolledCourse,
};
