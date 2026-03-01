import { compareHash, signToken } from '../../utils/security.js';
import { AppError } from '../../utils/errors.js';
import { findUserByUsername, findUserById } from '../users/users.repository.js';

export const authService = {
  async login(username: string, password: string) {
    const user = await findUserByUsername(username);
    if (!user || !(await compareHash(password, user.password_hash))) throw new AppError(401, 'Invalid credentials');
    const token = signToken({ id: user.id, branchId: user.branch_id, role: user.role, username: user.username });
    return { token };
  },
  async verifyPin(userId: string, pin: string) {
    const user = await findUserById(userId);
    if (!user || !(await compareHash(pin, user.pin_hash))) throw new AppError(401, 'Invalid PIN');
    return true;
  }
};
