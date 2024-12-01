import { z } from 'zod';

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .min(6, { message: 'Password can be minimum 6 characters' })
    .max(20, { message: 'Password can not be more than 20 characters' }),
  needsPasswordChange: z.boolean().default(true).optional(),
  role: z.enum(['admin', 'student', 'faculty']),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  isDeleted: z.boolean().default(false).optional(),
});

export const UserValidation = {
  userValidationSchema,
};
