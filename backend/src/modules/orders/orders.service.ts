import { v4 as uuid } from 'uuid';
import { getIO } from '../../config/socket.js';
import { AppError } from '../../utils/errors.js';
import { tablesService } from '../tables/tables.service.js';
import { ordersRepository } from './orders.repository.js';

export const ordersService = {
  async addItems(input: { branchId: string; waiterId: string; tableId: string; items: { productId: string; quantity: number }[] }) {
    await tablesService.assertWaiterOwnership(input.tableId, input.branchId, input.waiterId);
    let order: any = await ordersRepository.openOrderByTable(input.tableId);
    if (!order) {
      order = { id: uuid() };
      await ordersRepository.createOrder({ id: order.id, branchId: input.branchId, tableId: input.tableId, waiterId: input.waiterId });
    }
    for (const item of input.items) {
      const product: any = await ordersRepository.getProduct(item.productId, input.branchId);
      if (!product) throw new AppError(404, 'Product not found');
      if (product.stock < item.quantity) throw new AppError(400, 'Insufficient stock');
      await ordersRepository.addItem({ id: uuid(), orderId: order.id, productId: item.productId, quantity: item.quantity, unitPrice: product.price });
    }
    await ordersRepository.updateOrderTotal(order.id);
    getIO().to(`branch:${input.branchId}`).emit('order:new-items', { tableId: input.tableId });
  },
  listBar: (branchId: string) => ordersRepository.listTicketsByArea(branchId, 'BAR'),
  listKitchen: (branchId: string) => ordersRepository.listTicketsByArea(branchId, 'KITCHEN'),
  setTicketStatus: async (id: string, status: 'IN_PROGRESS' | 'READY' | 'DELIVERED') => {
    await ordersRepository.updateTicketStatus(id, status);
  }
};
