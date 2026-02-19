import { z } from 'zod';

export const loginSchema = z.object({ username: z.string().min(3), password: z.string().min(6) });
export const pinSchema = z.object({ pin: z.string().regex(/^\d{4,8}$/) });
