import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { UserStatus } from './user.constant';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: [true, 'User id is required'],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      minlength: [6, 'Password can be minimum 6 characters'],
      maxlength: [20, 'Password can not be more than 20 characters'],
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
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
      enum: UserStatus,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashPassword
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 100;

  return passwordChangedTime > jwtIssuedTimestamp;
};

const User = model<TUser, UserModel>('User', userSchema);

export default User;
