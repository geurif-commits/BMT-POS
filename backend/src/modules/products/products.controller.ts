import { Request, Response } from 'express';
import { productsService } from './products.service.js';

export const productsController = {
  list: async (req: Request, res: Response) => res.json(await productsService.list(req.user!.branchId)),
  create: async (req: Request, res: Response) => {
    await productsService.create(req.user!.branchId, req.user!.id, req.body);
    res.status(201).json({ success: true });
  },
  update: async (req: Request, res: Response) => {
    await productsService.update(req.params.id, req.user!.branchId, req.user!.id, req.body);
    res.json({ success: true });
  },
  delete: async (req: Request, res: Response) => {
    await productsService.delete(req.params.id, req.user!.branchId, req.user!.id, req.user!.role, req.body.pin);
    res.json({ success: true });
  }
};
