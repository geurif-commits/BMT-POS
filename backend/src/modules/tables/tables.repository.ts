import { query } from '../../database/client.js';

export const tablesRepository = {
  list: async (branchId: string) => (await query('SELECT t.*, u.full_name waiter_name FROM dining_tables t LEFT JOIN users u ON u.id=t.waiter_id WHERE t.branch_id=$1 ORDER BY code', [branchId])).rows,
  create: async (table: any) => query('INSERT INTO dining_tables (id, branch_id, code) VALUES ($1,$2,$3)', [table.id, table.branchId, table.code]),
  open: async (id: string, branchId: string, waiterId: string) =>
    query("UPDATE dining_tables SET status='OCCUPIED', waiter_id=$3, opened_at=NOW() WHERE id=$1 AND branch_id=$2 AND status='AVAILABLE'", [id, branchId, waiterId]),
  close: async (id: string, branchId: string) =>
    query("UPDATE dining_tables SET status='AVAILABLE', waiter_id=NULL, closed_at=NOW() WHERE id=$1 AND branch_id=$2", [id, branchId]),
  get: async (id: string, branchId: string) => (await query('SELECT * FROM dining_tables WHERE id=$1 AND branch_id=$2', [id, branchId])).rows[0]
};
