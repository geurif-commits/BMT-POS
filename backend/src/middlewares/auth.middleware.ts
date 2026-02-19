import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/security.js';
import { AppError } from '../utils/errors.js';
import { AuthUser, Role } from '../types.js';

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthUser;
  }
}

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) throw new AppError(401, 'Unauthorized');
  req.user = verifyToken(header.replace('Bearer ', ''));
  next();
};

export const requireRoles = (...roles: Role[]) => (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError(401, 'Unauthorized');
  if (!roles.includes(req.user.role)) throw new AppError(403, 'Insufficient role');
  next();
};
