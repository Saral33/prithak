import { joiValidator } from '@/decorators/validation.decorator';
import {
  ILoginInterface,
  IRegisterInterface,
} from '@/interfaces/user.interface';
import { BadRequestError } from '@/middleware/errorMiddleware';
import { UserRepositoryInstance } from '@/repositories/userRepository';
import Utils from '@/utils/globalUtils';
import UserValidationSchema from '@/validationSchema/userValidationSchema';
import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';
export class UserController {
  @joiValidator(UserValidationSchema.registerSchema)
  public async registerUser(
    req: Request<{}, {}, IRegisterInterface>,
    res: Response
  ) {
    const { name, email, password } = req.body;
    const user = await UserRepositoryInstance.Register({
      name,
      email,
      password,
    });
    if (user) {
      res.status(201).json({
        status: 'success',
        message: 'User created successfully',
      });
    } else {
      throw new BadRequestError('Some internal error');
    }
  }

  @joiValidator(UserValidationSchema.loginSchema)
  public async loginUser(req: Request<{}, {}, ILoginInterface>, res: Response) {
    const { email, password } = req.body;
    const user = await UserRepositoryInstance.Login({ email, password });

    if (user) {
      const { refreshToken, expiryDate } = Utils.generateRefreshToken();
      const accessToken = await Utils.generateAccessToken({ id: user.id });
      await UserRepositoryInstance.SaveRefreshToken({
        refreshToken,
        userId: user.id,
        expiryDate,
      });
      res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        data: {
          accessToken,
          refreshToken,
          userId: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      throw new BadRequestError('Some internal error');
    }
  }

  public async refresh(
    req: Request<{}, {}, { refreshToken: string }>,
    res: Response
  ) {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new BadRequestError('Refresh token is required');
    const user = await UserRepositoryInstance.FindByRefreshToken(refreshToken);

    if (user) {
      const accessToken = await Utils.generateAccessToken({
        id: user?.userId?.id,
      });

      res.status(200).json({
        status: 'success',
        message: 'Token refreshed successfully',
        data: {
          accessToken,
          userId: user.userId.id,
          name: user.userId.name,
          email: user.userId.email,
          role: user.userId.role,
        },
      });
    }
  }

  public async logout(req: Request, res: Response) {
    const userID = req.currentUserId!;

    const user = await UserRepositoryInstance.Logout(userID);
    if (user) {
      res.status(200).json({
        status: 'success',
        message: 'User logged out successfully',
      });
    }
  }

  public async me(req: Request, res: Response) {
    const userID = req.currentUserId!;

    const user = await UserRepositoryInstance.FindById(userID);
    if (user) {
      res.status(200).json({
        status: 'success',
        message: 'User found successfully',
        data: user,
      });
    }
  }
}
