import express from 'express';
import { EnrolledCourseControllers } from './enrolledCourse.controller';
import validateRequest from '../../middlewares/validateRequest';
import { EnrolledCourseValidations } from './enrolledCourse.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationSchema
  ),
  EnrolledCourseControllers.createEnrolledCourse
);

router.get(
  '/my-enrolled-courses',
  auth('student'),
  EnrolledCourseControllers.getMyEnrolledCourses
);

router.patch(
  '/update-enrolled-course-marks',
  auth('faculty'),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseValidationSchema
  ),
  EnrolledCourseControllers.updateEnrolledCourse
);

export const EnrolledCourseRoutes = router;
