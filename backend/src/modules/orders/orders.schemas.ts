import { z } from 'zod';

export const addItemSchema = z.object({
  tableId: z.string().uuid(),
  items: z.array(z.object({ productId: z.string().uuid(), quantity: z.number().int().positive() })).min(1)
});
