import { query } from '../../database/client.js';

export const paymentsRepository = {
  getOrder: async (id: string, branchId: string) => (await query('SELECT * FROM orders WHERE id=$1 AND branch_id=$2', [id, branchId])).rows[0],
  savePayment: async (p: any) => query('INSERT INTO payments (id, order_id, cashier_id, method, amount_cash, amount_card) VALUES ($1,$2,$3,$4,$5,$6)', [p.id, p.orderId, p.cashierId, p.method, p.amountCash, p.amountCard]),
  closeOrder: async (id: string) => query("UPDATE orders SET status='PAID', closed_at=NOW() WHERE id=$1", [id]),
  dailyReport: async (branchId: string) =>
    (await query(`SELECT DATE(paid_at) day, method, SUM(amount_cash + amount_card) total FROM payments p JOIN orders o ON o.id=p.order_id WHERE o.branch_id=$1 GROUP BY DATE(paid_at), method ORDER BY day DESC`, [branchId])).rows
};
