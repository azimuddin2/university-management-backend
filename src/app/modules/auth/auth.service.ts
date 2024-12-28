import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const isUserExists = await User.findOne({ id: payload?.id });
  if (!isUserExists) {
    throw new AppError(404, 'This user is not found!');
  }

  // checking if the user is already isDeleted
  const isDeletedUser = isUserExists?.isDeleted;
  if (isDeletedUser === true) {
    throw new AppError(403, 'This user is deleted!');
  }

  // checking if the user is blocked
  const userStatus = isUserExists?.status;
  if (userStatus === 'blocked') {
    throw new AppError(403, 'This user is blocked!');
  }

  // checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password
  );
  if (!isPasswordMatched) {
    // throw new AppError()
  }
};

export const AuthServices = {
  loginUser,
};
