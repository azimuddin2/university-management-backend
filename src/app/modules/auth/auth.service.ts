import jwt from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import { TLoginUser } from './auth.interface';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(404, 'This user is not found!');
  }

  if (user?.isDeleted === true) {
    throw new AppError(403, 'This user is deleted!');
  }

  if (user?.status === 'blocked') {
    throw new AppError(403, 'This user is blocked!');
  }

  // checking if the password is correct
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(403, 'Password do not matched!');
  }

  // create token and sent to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '7d',
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
