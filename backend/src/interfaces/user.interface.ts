import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

declare global {
  namespace Express {
    interface Request {
      currentUserId?: string;
    }
  }
}
export interface IUserInterface extends Partial<Document> {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  role: string;
  comparePassword(password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}

export interface IAuthInterface extends Partial<Document> {
  _id?: ObjectId;
  refreshToken: string;
  expiryDate: Date;
  userId: ObjectId | string;
}

export interface IRegisterInterface {
  name: string;
  email: string;
  password: string;
}

export interface ILoginInterface {
  email: string;
  password: string;
}
