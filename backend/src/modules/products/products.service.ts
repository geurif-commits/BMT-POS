import { v4 as uuid } from 'uuid';
import { Role } from '../../types.js';
import { AppError } from '../../utils/errors.js';
import { authService } from '../auth/auth.service.js';
import { auditService } from '../audit/audit.service.js';
import { productsRepository } from './products.repository.js';

export const productsService = {
  list: (branchId: string) => productsRepository.list(branchId),
  create: async (branchId: string, userId: string, body: any) => {
    await productsRepository.create({ id: uuid(), branchId, ...body });
    await auditService.log({ branchId, userId, action: 'CREATE_PRODUCT', entity: 'PRODUCT', metadata: { sku: body.sku } });
  },
  update: async (id: string, branchId: string, userId: string, body: any) => {
    await productsRepository.update(id, branchId, body);
    await auditService.log({ branchId, userId, action: 'UPDATE_PRODUCT', entity: 'PRODUCT', entityId: id });
  },
  delete: async (id: string, branchId: string, userId: string, role: Role, pin?: string) => {
    if (!['ADMIN', 'SUPERVISOR'].includes(role)) {
      if (!pin) throw new AppError(403, 'Admin/Supervisor PIN required');
      await authService.verifyPin(userId, pin);
    }
    await productsRepository.softDelete(id, branchId);
    await auditService.log({ branchId, userId, action: 'DELETE_PRODUCT', entity: 'PRODUCT', entityId: id });
  }
};
