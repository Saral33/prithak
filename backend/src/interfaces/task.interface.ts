import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface ITaskInterface extends Partial<Document> {
  _id?: ObjectId;
  title: string;
  description: string;
  status: 'pending' | 'inprogress' | 'completed';
  deadline: Date;
  priority: string;
  userId?: ObjectId | string;
}

export interface ICreateTaskInterface {
  title: string;
  description: string;
  status: 'pending' | 'inprogress' | 'completed';
  deadline: Date;
  priority: string;
}
