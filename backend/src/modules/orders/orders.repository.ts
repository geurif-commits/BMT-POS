import { query } from '../../database/client.js';

export const ordersRepository = {
  openOrderByTable: async (tableId: string) => (await query('SELECT * FROM orders WHERE table_id=$1 AND status=$2', [tableId, 'OPEN'])).rows[0],
  createOrder: async (order: any) => query('INSERT INTO orders (id, branch_id, table_id, waiter_id) VALUES ($1,$2,$3,$4)', [order.id, order.branchId, order.tableId, order.waiterId]),
  getProduct: async (productId: string, branchId: string) => (await query('SELECT * FROM products WHERE id=$1 AND branch_id=$2 AND deleted_at IS NULL', [productId, branchId])).rows[0],
  addItem: async (item: any) => query('INSERT INTO order_items (id, order_id, product_id, quantity, unit_price) VALUES ($1,$2,$3,$4,$5)', [item.id, item.orderId, item.productId, item.quantity, item.unitPrice]),
  updateOrderTotal: async (orderId: string) => query('UPDATE orders SET total=(SELECT COALESCE(SUM(quantity*unit_price),0) FROM order_items WHERE order_id=$1) WHERE id=$1', [orderId]),
  listTicketsByArea: async (branchId: string, area: 'BAR' | 'KITCHEN') =>
    (await query(`SELECT oi.*, o.table_id, p.name product_name FROM order_items oi JOIN orders o ON o.id=oi.order_id JOIN products p ON p.id=oi.product_id WHERE o.branch_id=$1 AND p.area=$2 AND oi.ticket_status IN ('PENDING','IN_PROGRESS')`, [branchId, area])).rows,
  updateTicketStatus: async (id: string, status: string) => query('UPDATE order_items SET ticket_status=$2 WHERE id=$1', [id, status])
};
