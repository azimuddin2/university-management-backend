import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, 'User id is required'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      minlength: [6, 'Password can be minimum 6 characters'],
      maxlength: [20, 'Password can not be more than 20 characters'],
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'student', 'faculty'],
        message: '{VALUE} is not valid',
      },
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model<TUser>('User', userSchema);

export default User;
