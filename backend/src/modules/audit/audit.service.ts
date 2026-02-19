import { v4 as uuid } from 'uuid';
import { createAudit, listAuditByBranch } from './audit.repository.js';

export const auditService = {
  log: (payload: Omit<Parameters<typeof createAudit>[0], 'id'>) => createAudit({ id: uuid(), ...payload }),
  listByBranch: (branchId: string) => listAuditByBranch(branchId)
};
