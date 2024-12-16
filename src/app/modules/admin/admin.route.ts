import express from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidations } from './admin.validation';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);
router.get('/:adminId', AdminControllers.getSingleAdmin);
router.patch(
  '/:adminId',
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin
);
router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
