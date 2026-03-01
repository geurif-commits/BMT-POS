import { Router } from 'express';
import { z } from 'zod';
import { tablesController } from './tables.controller.js';
import { requireRoles } from '../../middlewares/auth.middleware.js';
import { validate } from '../../utils/validation.js';

export const tablesRoutes = Router();
const createSchema = z.object({ code: z.string().min(1).max(20) });

tablesRoutes.get('/', tablesController.list);
tablesRoutes.post('/', requireRoles('ADMIN', 'SUPERVISOR'), validate(createSchema), tablesController.create);
tablesRoutes.post('/:id/open', requireRoles('WAITER'), tablesController.open);
tablesRoutes.post('/:id/close', requireRoles('WAITER', 'CASHIER', 'SUPERVISOR', 'ADMIN'), tablesController.close);
