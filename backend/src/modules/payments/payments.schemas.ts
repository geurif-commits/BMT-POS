import { z } from 'zod';

export const paymentSchema = z.object({
  orderId: z.string().uuid(),
  method: z.enum(['CASH', 'CARD', 'MIXED']),
  amountCash: z.number().nonnegative().default(0),
  amountCard: z.number().nonnegative().default(0)
});
