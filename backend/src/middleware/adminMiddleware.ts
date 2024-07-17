import config from '@/config';
import { NotAuthorizedError } from '@/middleware/errorMiddleware';
import { UserModel } from '@/model/userModel';
import { NextFunction, Request, Response } from 'express';
import Jwt from 'jsonwebtoken';

export const checkIfuserIsAdmin = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req?.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    throw new NotAuthorizedError('Token not found. Please login');
  }
  try {
    const decoded = Jwt.verify(token, config.JWT_SECRET!);
    req.currentUserId = (decoded as { id: string }).id;
    const user = await UserModel.findById(req.currentUserId);
    if (!user) {
      throw new NotAuthorizedError('User not found. Please login');
    } else {
      const isAdmin = user.role === 'admin';
      if (!isAdmin) {
        throw new NotAuthorizedError('User is not admin. Not authorized');
      }

      next();
    }
  } catch (error) {
    throw new NotAuthorizedError('Token is invalid. Please login');
  }
  next();
};
