import { Request, Response } from 'express';
import { tablesService } from './tables.service.js';

export const tablesController = {
  list: async (req: Request, res: Response) => res.json(await tablesService.list(req.user!.branchId)),
  create: async (req: Request, res: Response) => {
    await tablesService.create(req.user!.branchId, req.body.code, req.user!.id);
    res.status(201).json({ success: true });
  },
  open: async (req: Request, res: Response) => {
    await tablesService.open(req.params.id, req.user!.branchId, req.user!.id);
    res.json({ success: true });
  },
  close: async (req: Request, res: Response) => {
    await tablesService.close(req.params.id, req.user!.branchId, req.user!.id);
    res.json({ success: true });
  }
};
