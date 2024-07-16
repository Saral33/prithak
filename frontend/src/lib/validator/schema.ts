import { z, ZodType } from 'zod';

export const registerSchema: ZodType<{
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}> = z
  .object({
    email: z.string().email({ message: 'Email must be valid' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(20, { message: 'Password must be less than 20 characters long' }),
    name: z
      .string()
      .min(4, { message: 'Name must be at least 4 characters long' })
      .max(20, { message: 'Name must be less than 20 characters long' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(20, { message: 'Password must be less than 20 characters long' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password and confirm password do not match',
    path: ['confirmPassword'],
  });

export const loginSchema: ZodType<{
  email: string;
  password: string;
}> = z.object({
  email: z.string().email({ message: 'Email must be valid' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(20, { message: 'Password must be less than 20 characters long' }),
});
