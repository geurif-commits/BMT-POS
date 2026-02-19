import { query } from '../../database/client.js';

export const productsRepository = {
  list: async (branchId: string) => (await query('SELECT * FROM products WHERE branch_id=$1 AND deleted_at IS NULL ORDER BY name', [branchId])).rows,
  create: async (data: any) => {
    await query(
      `INSERT INTO products (id, branch_id, category_id, name, sku, area, price, stock)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [data.id, data.branchId, data.categoryId ?? null, data.name, data.sku, data.area, data.price, data.stock]
    );
  },
  update: async (id: string, branchId: string, data: any) => {
    await query(
      `UPDATE products SET category_id=$3, name=$4, sku=$5, area=$6, price=$7, stock=$8
       WHERE id=$1 AND branch_id=$2 AND deleted_at IS NULL`,
      [id, branchId, data.categoryId ?? null, data.name, data.sku, data.area, data.price, data.stock]
    );
  },
  softDelete: async (id: string, branchId: string) => {
    await query('UPDATE products SET deleted_at=NOW() WHERE id=$1 AND branch_id=$2 AND deleted_at IS NULL', [id, branchId]);
  }
};
