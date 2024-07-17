import { IUserInterface } from '@/interfaces/user.interface';
import { BadRequestError } from '@/middleware/errorMiddleware';
import { AuthNodal } from '@/model/authModel';
import { TaskModal } from '@/model/taskModal';
import { UserModel } from '@/model/userModel';
import Utils from '@/utils/globalUtils';

class UserRepository {
  public async Register({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) {
    const isUserExists = await UserModel.findOne({ email });
    if (isUserExists) {
      throw new BadRequestError('User already exists with this email');
    } else {
      const user = await UserModel.create({
        name,
        email,
        password,
        role: 'user',
      });
      return user;
    }
  }
  public async Login({ email, password }: { email: string; password: string }) {
    const user = await UserModel.findOne({ email });
    if (user) {
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return user;
      } else {
        throw new BadRequestError('Invalid credentials');
      }
    } else {
      throw new BadRequestError('Invalid credentials');
    }
  }

  public async SaveRefreshToken({
    refreshToken,
    userId,
    expiryDate,
  }: {
    refreshToken: string;
    userId: string;
    expiryDate: Date;
  }) {
    const userWithToken = await AuthNodal.findOne({ userId });

    if (!userWithToken) {
      await AuthNodal.create<typeof AuthNodal>({
        refreshToken,
        userId,
        expiryDate,
      });
    } else {
      userWithToken.refreshToken = refreshToken;
      userWithToken.expiryDate = expiryDate;
      await userWithToken.save();
    }
  }

  public async FindByRefreshToken(refreshToken: string) {
    const user = await AuthNodal.findOne({ refreshToken }).populate<{
      userId: IUserInterface;
    }>('userId', ['name', 'email', 'role', 'id']);

    if (user) {
      const isTokenExpired = Utils.checkRefreshTokenExpiry(user.expiryDate);
      if (isTokenExpired) {
        throw new BadRequestError('Refresh token expired.Please login again');
      }
      return user;
    } else {
      throw new BadRequestError('Invalid refresh token');
    }
  }

  public async Logout(userId: string) {
    const user = await AuthNodal.findOneAndDelete({ userId });
    if (user) {
      return user;
    } else {
      throw new BadRequestError('User not found');
    }
  }

  public async FindById(id: string) {
    const user = await UserModel.findOne({ _id: id }).select(
      '-createdAt -updatedAt'
    );
    if (user) {
      return user;
    } else {
      throw new BadRequestError('User not found');
    }
  }

  public async GetCounts() {
    const userCount = await UserModel.countDocuments();
    const taskCount = await TaskModal.countDocuments();
    return { userCount, taskCount };
  }
}

const UserRepositoryInstance = new UserRepository();
export { UserRepositoryInstance };
