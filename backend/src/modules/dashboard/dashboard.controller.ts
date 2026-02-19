import { Request, Response } from 'express';
import { query } from '../../database/client.js';

export const dashboardController = {
  cashierOverview: async (req: Request, res: Response) => {
    const tables = await query(
      `SELECT t.code, t.status, u.full_name waiter_name,
      COALESCE((SELECT status FROM orders o WHERE o.table_id=t.id ORDER BY created_at DESC LIMIT 1),'NO_ORDER') payment_status
      FROM dining_tables t LEFT JOIN users u ON u.id=t.waiter_id WHERE t.branch_id=$1`,
      [req.user!.branchId]
    );
    res.json(tables.rows);
  }
};
