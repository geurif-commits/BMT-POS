export type Role = 'ADMIN' | 'SUPERVISOR' | 'CASHIER' | 'WAITER' | 'BAR' | 'KITCHEN';

export interface AuthUser {
  id: string;
  branchId: string;
  role: Role;
  username: string;
}
