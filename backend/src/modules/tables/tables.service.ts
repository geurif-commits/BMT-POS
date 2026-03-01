import { v4 as uuid } from 'uuid';
import { AppError } from '../../utils/errors.js';
import { auditService } from '../audit/audit.service.js';
import { tablesRepository } from './tables.repository.js';

export const tablesService = {
  list: (branchId: string) => tablesRepository.list(branchId),
  create: async (branchId: string, code: string, userId: string) => {
    await tablesRepository.create({ id: uuid(), branchId, code });
    await auditService.log({ branchId, userId, action: 'CREATE_TABLE', entity: 'TABLE', metadata: { code } });
  },
  open: async (tableId: string, branchId: string, waiterId: string) => {
    await tablesRepository.open(tableId, branchId, waiterId);
  },
  assertWaiterOwnership: async (tableId: string, branchId: string, waiterId: string) => {
    const table: any = await tablesRepository.get(tableId, branchId);
    if (!table) throw new AppError(404, 'Table not found');
    if (table.waiter_id !== waiterId) throw new AppError(403, 'Table is locked to another waiter');
  },
  close: async (tableId: string, branchId: string, userId: string) => {
    await tablesRepository.close(tableId, branchId);
    await auditService.log({ branchId, userId, action: 'CLOSE_TABLE', entity: 'TABLE', entityId: tableId });
  }
};
