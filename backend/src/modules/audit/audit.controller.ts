import { Request, Response } from 'express';
import { auditService } from './audit.service.js';

export const auditController = {
  list: async (req: Request, res: Response) => {
    const data = await auditService.listByBranch(req.user!.branchId);
    res.json(data);
  }
};
