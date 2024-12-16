import { model, Schema } from 'mongoose';
import { AdminModel, TAdmin, TUserName } from './admin.interface';
import { BloodGroup, Gender } from './admin.constant';
import AppError from '../../errors/AppError';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    minlength: [3, 'The length of first name can be minimum 3 characters'],
    maxlength: [20, 'The length of first name can be maximum 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    minlength: [3, 'The length of last name can be minimum 3 characters'],
    maxlength: [20, 'The length of last name can be maximum 20 characters'],
  },
});

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: [true, 'Admin Id is required'],
      trim: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not valid',
      },
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth field required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'Please enter a valid email',
      },
    },
    contactNo: {
      type: String,
      required: [true, 'Contact No is required'],
      trim: true,
      validate: {
        validator: function (v) {
          return /^\+?[0-9]{10,15}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid contact number!`,
      },
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact number is required'],
      trim: true,
      validate: {
        validator: function (v) {
          return /^\+?[0-9]{10,15}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid emergency contact number!`,
      },
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not valid',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
      trim: true,
    },
    profileImg: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

adminSchema.pre('save', async function (next) {
  const isAdminExist = await Admin.findOne({
    email: this.email,
  });

  if (isAdminExist) {
    throw new AppError(403, 'This admin email is already exist!');
  }

  next();
});

adminSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isAdminExist = await Admin.findOne(query);

  if (!isAdminExist) {
    throw new AppError(404, 'This admin does not exist!');
  }

  next();
});

adminSchema.pre('findOneAndDelete', async function (next) {
  const query = this.getQuery();

  const isAdminExist = await Admin.findOne(query);

  if (!isAdminExist) {
    throw new AppError(404, 'This admin does not exist!');
  }

  next();
});

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
