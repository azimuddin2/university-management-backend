import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';

export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new AppError(401, 'You are not authorized');
  }
};
