import { IAuthInterface } from '@/interfaces/user.interface';
import { model, Model, Schema } from 'mongoose';

const authSchema = new Schema<IAuthInterface>(
  {
    refreshToken: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const AuthNodal: Model<IAuthInterface> = model<IAuthInterface>(
  'Auth',
  authSchema,
  'Auth'
);
export { AuthNodal };
