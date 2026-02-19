import { Router } from 'express';
import { auditController } from './audit.controller.js';
import { requireRoles } from '../../middlewares/auth.middleware.js';

export const auditRoutes = Router();
auditRoutes.get('/', requireRoles('ADMIN', 'SUPERVISOR'), auditController.list);
