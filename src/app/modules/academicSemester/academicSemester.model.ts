import { model, Schema } from 'mongoose';
import { TAcademicSemester, TMonths } from './academicSemester.interface';

const months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: {
        values: ['Autumn', 'Summar', 'Fall'],
        message: '{VALUE} is not valid',
      },
      required: true,
    },
    code: {
      type: String,
      enum: {
        values: ['01', '02', '03'],
        message: '{VALUE} is not valid',
      },
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    startMonth: {
      type: String,
      enum: {
        values: months,
        message: '{VALUE} is not valid',
      },
    },
    endMonth: {
      type: String,
      enum: {
        values: months,
        message: '{VALUE} is not valid',
      },
    },
  },
  { timestamps: true }
);

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema
);
