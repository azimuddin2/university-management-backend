import express from 'express';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-academic-department',
  // validateRequest(
  //   AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
  // ),
  AcademicDepartmentControllers.createAcademicDepartment
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);

router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment
);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.updateAcademicDepartment
);

router.delete(
  '/:departmentId',
  AcademicDepartmentControllers.deleteAcademicDepartment
);

export const AcademicDepartmentRoutes = router;
