import { Router } from 'express';
import { validate } from '../../utils/validation.js';
import { paymentSchema } from './payments.schemas.js';
import { paymentsController } from './payments.controller.js';
import { requireRoles } from '../../middlewares/auth.middleware.js';

export const paymentsRoutes = Router();
paymentsRoutes.post('/', requireRoles('CASHIER', 'SUPERVISOR', 'ADMIN'), validate(paymentSchema), paymentsController.pay);
paymentsRoutes.get('/report/daily', requireRoles('CASHIER', 'SUPERVISOR', 'ADMIN'), paymentsController.report);
