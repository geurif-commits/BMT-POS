import { Request, Response } from 'express';
import { ordersService } from './orders.service.js';

export const ordersController = {
  addItems: async (req: Request, res: Response) => {
    await ordersService.addItems({ branchId: req.user!.branchId, waiterId: req.user!.id, tableId: req.body.tableId, items: req.body.items });
    res.status(201).json({ success: true });
  },
  barQueue: async (req: Request, res: Response) => res.json(await ordersService.listBar(req.user!.branchId)),
  kitchenQueue: async (req: Request, res: Response) => res.json(await ordersService.listKitchen(req.user!.branchId)),
  updateTicketStatus: async (req: Request, res: Response) => {
    await ordersService.setTicketStatus(req.params.id, req.body.status);
    res.json({ success: true });
  }
};
