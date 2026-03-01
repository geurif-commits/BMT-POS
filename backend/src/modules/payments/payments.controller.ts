import { Request, Response } from 'express';
import { paymentsService } from './payments.service.js';

export const paymentsController = {
  pay: async (req: Request, res: Response) => {
    await paymentsService.pay(req.user!.branchId, req.user!.id, req.body);
    res.status(201).json({ success: true });
  },
  report: async (req: Request, res: Response) => res.json(await paymentsService.report(req.user!.branchId))
};
