import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const forgotSchema = z.object({ email: z.string().email() });

export const resetSchema = z.object({ email: z.string().email(), token: z.string(), newPassword: z.string().min(6) });
