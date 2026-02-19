import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../utils/validation.js';
import { requireRoles } from '../../middlewares/auth.middleware.js';
import { addItemSchema } from './orders.schemas.js';
import { ordersController } from './orders.controller.js';

export const ordersRoutes = Router();
const updateStatusSchema = z.object({ status: z.enum(['IN_PROGRESS', 'READY', 'DELIVERED']) });

ordersRoutes.post('/items', requireRoles('WAITER'), validate(addItemSchema), ordersController.addItems);
ordersRoutes.get('/bar-queue', requireRoles('BAR', 'SUPERVISOR', 'ADMIN'), ordersController.barQueue);
ordersRoutes.get('/kitchen-queue', requireRoles('KITCHEN', 'SUPERVISOR', 'ADMIN'), ordersController.kitchenQueue);
ordersRoutes.patch('/tickets/:id/status', requireRoles('BAR', 'KITCHEN', 'SUPERVISOR', 'ADMIN'), validate(updateStatusSchema), ordersController.updateTicketStatus);
