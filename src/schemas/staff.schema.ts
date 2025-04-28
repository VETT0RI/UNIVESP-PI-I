import { z } from 'zod';

export const staffSchema = z.object({
    id: z.string().uuid(),
    //name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    //role: z.enum(["admin", "editor", "viewer"]),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        //.regex(/[@$!%*?&#]/, "Password must contain at least one special character")
        ,
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

export const createStaffSchema = staffSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});