import { IUserInterface } from '@/interfaces/user.interface';
import { model, Model, Schema } from 'mongoose';
import { compare, hash } from 'bcryptjs';

const userSchema = new Schema<IUserInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: {
      // In json object delete password field for security purposes
      transform(_doc, res) {
        delete res.password;
        return res;
      },
    },
  }
);

const SALT = 12;
//use this to hash password before saving
userSchema.pre('save', async function (this: IUserInterface, next: () => void) {
  const hashedPassword: string = await hash(this.password as string, SALT);
  this.password = hashedPassword;
  next();
});

//compare orginal password with hashed password
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const hashedPassword: string = (this as IUserInterface).password!;
  return compare(password, hashedPassword);
};

const UserModel: Model<IUserInterface> = model<IUserInterface>(
  'User',
  userSchema,
  'User'
);
export { UserModel };
