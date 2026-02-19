import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2),
  sku: z.string().min(2),
  categoryId: z.string().uuid().optional(),
  area: z.enum(['BAR', 'KITCHEN']),
  price: z.number().positive(),
  stock: z.number().int().nonnegative()
});
