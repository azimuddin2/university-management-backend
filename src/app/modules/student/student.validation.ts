import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(3, 'The length of first name can be minimum 3 characters')
    .max(20, 'The length of first name can be maximum 20 characters'),
  middleName: z
    .string()
    .min(3, 'The length of middle name can be minimum 3 characters')
    .max(20, 'The length of middle name can be maximum 20 characters')
    .optional(),
  lastName: z
    .string()
    .min(3, 'The length of last name can be minimum 3 characters')
    .max(20, 'The length of last name can be maximum 20 characters'),
});

const guardianValidationSchema = z.object({
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

const localGuardianValidationSchema = z.object({
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

const studentValidationSchema = z.object({
  id: z.string(),
  name: userNameValidationSchema,
  email: z.string().email('Please enter a valid email'),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string(),
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
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  isActive: z.enum(['active', 'block']).default('active'),
});

export default studentValidationSchema;
