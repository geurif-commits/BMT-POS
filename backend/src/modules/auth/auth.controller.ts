import { Request, Response } from 'express';
import { authService } from './auth.service.js';

export const authController = {
  login: async (req: Request, res: Response) => {
    const out = await authService.login(req.body.username, req.body.password);
    res.json(out);
  },
  verifyPin: async (req: Request, res: Response) => {
    await authService.verifyPin(req.user!.id, req.body.pin);
    res.json({ success: true });
  }
};
