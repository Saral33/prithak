import { z, ZodType } from 'zod';

export const taskCreateSchema: ZodType<{
  title: string;
  description: string;
  status: string;
  deadline: Date;
  priority: string;
}> = z.object({
  title: z
    .string()
    .min(4, { message: 'Title must be at least 4 characters long' })
    .max(20, { message: 'Title must be less than 20 characters long' }),
  description: z.string(),
  status: z.enum(['pending', 'inprogress', 'completed']),
  deadline: z
    .date()
    .refine((val) => val > new Date(), {
      message: 'Deadline must be greater than today',
    }),
  priority: z.enum(['low', 'medium', 'high']),
});
