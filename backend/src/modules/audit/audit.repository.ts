import { query } from '../../database/client.js';

export const createAudit = async (input: {
  id: string;
  branchId?: string;
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  metadata?: unknown;
}) => {
  await query(
    `INSERT INTO audit_logs (id, branch_id, user_id, action, entity, entity_id, metadata)
     VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [input.id, input.branchId, input.userId, input.action, input.entity, input.entityId, input.metadata ?? null]
  );
};

export const listAuditByBranch = async (branchId: string) => {
  const result = await query('SELECT * FROM audit_logs WHERE branch_id=$1 ORDER BY created_at DESC LIMIT 200', [branchId]);
  return result.rows;
};
