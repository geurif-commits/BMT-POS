import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/errors.js';
import { logger } from '../config/logger.js';

export const notFound = (_req: Request, _res: Response, next: NextFunction) => next(new AppError(404, 'Route not found'));

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) return res.status(400).json({ message: 'Validation failed', issues: err.flatten() });
  if (err instanceof AppError) return res.status(err.status).json({ message: err.message, details: err.details });
  logger.error(err);
  return res.status(500).json({ message: 'Internal server error' });
};
