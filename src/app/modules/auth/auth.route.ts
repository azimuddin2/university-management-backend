import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.handleLoginUser
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.handleChangePassword
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.handleRefreshToken
);

router.post(
  '/forget-password',
  validateRequest(AuthValidations.forgetPasswordValidationSchema),
  AuthControllers.handleForgetPassword
);

router.post(
  '/reset-password',
  validateRequest(AuthValidations.resetPasswordValidationSchema),
  AuthControllers.handleResetPassword
);

export const AuthRoutes = router;
