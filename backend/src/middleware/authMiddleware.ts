import Jwt from 'jsonwebtoken';
import { NotAuthorizedError } from './errorMiddleware';
import { NextFunction, Request, Response } from 'express';
import config from '@/config';
export const checkAuthMiddleware = (
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
  } catch (error) {
    throw new NotAuthorizedError('Token is invalid. Please login');
  }
  next();
};
