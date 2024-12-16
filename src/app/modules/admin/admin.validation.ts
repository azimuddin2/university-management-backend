import { z } from 'zod';
import { BloodGroup, Gender } from './admin.constant';

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

const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    admin: z.object({
      designation: z.string(),
      name: createUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string(),
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

const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      designation: z.string().optional(),
      name: updateUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
