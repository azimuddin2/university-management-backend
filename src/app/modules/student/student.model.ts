import { model, Schema } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required.'],
    trim: true,
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
  matherName: {
    type: String,
    required: [true, 'Mother name is required.'],
    trim: true,
  },
  matherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required.'],
    trim: true,
  },
  matherContactNo: {
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

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, 'Guardian name is required.'],
    trim: true,
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

const studentSchema = new Schema<Student>(
  {
    id: { type: String },
    name: userNameSchema,
    email: {
      type: String,
      required: [true, 'Student email is required'],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'Please enter a valid email',
      },
    },
    gender: ['male', 'female'],
    dateOfBirth: { type: String },
    contactNo: {
      type: String,
      required: [true, 'Contact No is required'],
      trim: true,
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact number is required'],
      trim: true,
    },
    bloodGroup: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
    profileImg: { type: String },
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
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    isActive: ['active', 'block'],
  },
  { timestamps: true }
);

const StudentModel = model<Student>('Student', studentSchema);

export default StudentModel;
