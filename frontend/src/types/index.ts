export type Role = 'ADMIN' | 'SUPERVISOR' | 'CASHIER' | 'WAITER' | 'BAR' | 'KITCHEN';

export interface UserSession {
  token: string;
  role: Role;
  username: string;
  branchId: string;
}
