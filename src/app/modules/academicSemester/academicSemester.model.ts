import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: {
        values: academicSemesterName,
        message: '{VALUE} is not valid',
      },
      required: true,
    },
    code: {
      type: String,
      enum: {
        values: academicSemesterCode,
        message: '{VALUE} is not valid',
      },
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: {
        values: months,
        message: '{VALUE} is not valid',
      },
    },
    endMonth: {
      type: String,
      required: true,
      enum: {
        values: months,
        message: '{VALUE} is not valid',
      },
    },
  },
  { timestamps: true }
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExists) {
    throw new Error('Semester is already exists');
  }

  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema
);
