import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidations } from './faculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getAllFaculties
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getSingleFaculty
);

router.patch(
  '/:id',
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);

router.delete('/:id', FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
