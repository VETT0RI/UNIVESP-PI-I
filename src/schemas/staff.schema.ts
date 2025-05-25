import { z } from 'zod'

export const staffSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const createStaffSchema = staffSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
