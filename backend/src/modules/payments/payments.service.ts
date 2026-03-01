import { v4 as uuid } from 'uuid';
import { AppError } from '../../utils/errors.js';
import { auditService } from '../audit/audit.service.js';
import { paymentsRepository } from './payments.repository.js';

export const paymentsService = {
  async pay(branchId: string, cashierId: string, body: any) {
    const order: any = await paymentsRepository.getOrder(body.orderId, branchId);
    if (!order) throw new AppError(404, 'Order not found');
    const totalPaid = Number(body.amountCash) + Number(body.amountCard);
    if (totalPaid < Number(order.total)) throw new AppError(400, 'Insufficient payment');
    await paymentsRepository.savePayment({ id: uuid(), orderId: body.orderId, cashierId, ...body });
    await paymentsRepository.closeOrder(body.orderId);
    await auditService.log({ branchId, userId: cashierId, action: 'ORDER_PAID', entity: 'PAYMENT', entityId: body.orderId, metadata: { totalPaid } });
  },
  report: (branchId: string) => paymentsRepository.dailyReport(branchId)
};
