import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(3, 'The length of first name can be minimum 3 characters')
    .max(20, 'The length of first name can be maximum 20 characters'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(3, 'The length of last name can be minimum 3 characters')
    .max(20, 'The length of last name can be maximum 20 characters'),
});

const createGuardianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(3, 'The length of father name can be minimum 3 characters')
    .max(20, 'The length of father name can be maximum 20 characters'),
  fatherOccupation: z.string(),
  fatherContactNo: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, 'Father contact number is not valid'),
  motherName: z
    .string()
    .min(3, 'The length of mother name can be minimum 3 characters')
    .max(20, 'The length of mother name can be maximum 20 characters'),
  motherOccupation: z.string(),
  motherContactNo: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, 'Mother contact number is not valid'),
});

const createLocalGuardianValidationSchema = z.object({
  name: z
    .string()
    .min(3, 'The length of Guardian name can be minimum 3 characters')
    .max(20, 'The length of Guardian name can be maximum 20 characters'),
  occupation: z.string(),
  contactNo: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, 'Guardian contact number is not valid'),
  address: z.string(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .min(6, { message: 'Password can be minimum 6 characters' })
      .max(20, { message: 'Password can not be more than 20 characters' })
      .optional(),
    student: z.object({
      name: createUserNameValidationSchema,
      email: z.string().email('Please enter a valid email'),
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      contactNo: z
        .string()
        .regex(/^\+?[0-9]{10,15}$/, 'Contact number is not valid'),
      emergencyContactNo: z
        .string()
        .regex(/^\+?[0-9]{10,15}$/, 'Emergency contact number is not valid'),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      profileImg: z.string().optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(3, 'The length of first name can be minimum 3 characters')
    .max(20, 'The length of first name can be maximum 20 characters')
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(3, 'The length of last name can be minimum 3 characters')
    .max(20, 'The length of last name can be maximum 20 characters')
    .optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(3, 'The length of father name can be minimum 3 characters')
    .max(20, 'The length of father name can be maximum 20 characters')
    .optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, 'Father contact number is not valid')
    .optional(),
  motherName: z
    .string()
    .min(3, 'The length of mother name can be minimum 3 characters')
    .max(20, 'The length of mother name can be maximum 20 characters')
    .optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, 'Mother contact number is not valid')
    .optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z
    .string()
    .min(3, 'The length of Guardian name can be minimum 3 characters')
    .max(20, 'The length of Guardian name can be maximum 20 characters')
    .optional(),
  occupation: z.string(),
  contactNo: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, 'Guardian contact number is not valid')
    .optional(),
  address: z.string().optional(),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      email: z.string().email('Please enter a valid email').optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      contactNo: z
        .string()
        .regex(/^\+?[0-9]{10,15}$/, 'Contact number is not valid')
        .optional(),
      emergencyContactNo: z
        .string()
        .regex(/^\+?[0-9]{10,15}$/, 'Emergency contact number is not valid')
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
        .optional(),
      profileImg: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
