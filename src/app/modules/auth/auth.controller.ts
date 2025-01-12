import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const handleLoginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, refreshToken, needsPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const handleChangePassword = catchAsync(async (req, res) => {
  const result = await AuthServices.changePassword(req.user, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password is updated successfully!',
    data: result,
  });
});

const handleRefreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});

const handleForgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthServices.forgetPassword(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Reset link is generated successfully!',
    data: result,
  });
});

const handleResetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await AuthServices.resetPassword(req.body, token as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password reset successfully!',
    data: result,
  });
});

export const AuthControllers = {
  handleLoginUser,
  handleChangePassword,
  handleRefreshToken,
  handleForgetPassword,
  handleResetPassword,
};
