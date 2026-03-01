import { Router } from 'express';
import { authController } from './auth.controller.js';
import { validate } from '../../utils/validation.js';
import { loginSchema, pinSchema } from './auth.schemas.js';
import { requireAuth } from '../../middlewares/auth.middleware.js';

export const authRoutes = Router();
authRoutes.post('/login', validate(loginSchema), authController.login);
authRoutes.post('/verify-pin', requireAuth, validate(pinSchema), authController.verifyPin);
