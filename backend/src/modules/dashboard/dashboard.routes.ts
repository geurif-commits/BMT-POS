import { Router } from 'express';
import { dashboardController } from './dashboard.controller.js';
import { requireRoles } from '../../middlewares/auth.middleware.js';

export const dashboardRoutes = Router();
dashboardRoutes.get('/cashier-overview', requireRoles('CASHIER', 'SUPERVISOR', 'ADMIN'), dashboardController.cashierOverview);
