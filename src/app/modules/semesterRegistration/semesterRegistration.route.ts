import express from 'express';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.createSemesterRegistration
);

router.get('/', SemesterRegistrationControllers.getAllSemesterRegistrations);
router.get(
  '/:id',
  SemesterRegistrationControllers.getSingleSemesterRegistration
);

export const SemesterRegistrationRoutes = router;
