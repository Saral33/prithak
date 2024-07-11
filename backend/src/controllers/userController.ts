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
        },
      });
    } else {
      throw new BadRequestError('Some internal error');
    }
  }

  public async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new BadRequestError('Refresh token is required');
    const user = await UserRepositoryInstance.FindByRefreshToken(refreshToken);
    if (user) {
      const { refreshToken: newRefreshToken, expiryDate } =
        Utils.generateRefreshToken();
      const accessToken = await Utils.generateAccessToken({
        id: `${user?.userId}`,
      });
      await UserRepositoryInstance.SaveRefreshToken({
        refreshToken: newRefreshToken,
        userId: `${user?.userId}`,
        expiryDate,
      });
      res.status(200).json({
        status: 'success',
        message: 'Token refreshed successfully',
        data: {
          accessToken,
          refreshToken: newRefreshToken,
        },
      });
    } else {
      throw new BadRequestError('Some internal error');
    }
  }
}
