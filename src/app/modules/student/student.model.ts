import { model, Schema } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
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
    // minlength: [3, 'The length of middle name can be minimum 3 characters'],
    // maxlength: [20, 'The length of middle name can be maximum 20 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    minlength: [3, 'The length of last name can be minimum 3 characters'],
    maxlength: [20, 'The length of last name can be maximum 20 characters'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required.'],
    trim: true,
    minlength: [3, 'The length of father name can be minimum 3 characters'],
    maxlength: [20, 'The length of father name can be maximum 20 characters'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required.'],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required.'],
    trim: true,
    validate: {
      validator: function (v) {
        return /^\+?[0-9]{10,15}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid contact number!`,
    },
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required.'],
    trim: true,
    minlength: [3, 'The length of mother name can be minimum 3 characters'],
    maxlength: [20, 'The length of mother name can be maximum 20 characters'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required.'],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required.'],
    trim: true,
    validate: {
      validator: function (v) {
        return /^\+?[0-9]{10,15}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid contact number!`,
    },
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Guardian name is required.'],
    trim: true,
    minlength: [3, 'The length of Guardian name can be minimum 3 characters'],
    maxlength: [20, 'The length of Guardian name can be maximum 20 characters'],
  },
  occupation: {
    type: String,
    required: [true, 'Guardian occupation is required.'],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Guardian contact number is required.'],
    trim: true,
    validate: {
      validator: function (v) {
        return /^\+?[0-9]{10,15}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid contact number!`,
    },
  },
  address: {
    type: String,
    required: [true, 'Guardian address is required.'],
    trim: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student Id is required'],
      trim: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
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
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid',
      },
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth field required'],
      trim: true,
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
        values: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
        message: '{VALUE} is not valid',
      },
    },
    profileImg: {
      type: String,
      trim: true,
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
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian is required'],
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
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

studentSchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    ' ' +
    this?.name?.middleName +
    ' ' +
    this?.name?.lastName
  );
});

studentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isStudentExist = await Student.findOne(query);

  if (!isStudentExist) {
    throw new AppError(404, 'This student does not exist!');
  }

  next();
});

const Student = model<TStudent, StudentModel>('Student', studentSchema);

export default Student;
