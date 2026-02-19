import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AuthUser } from '../types.js';

export const hashValue = (plain: string) => bcrypt.hash(plain, env.BCRYPT_ROUNDS);
export const compareHash = (plain: string, hash: string) => bcrypt.compare(plain, hash);
export const signToken = (user: AuthUser) =>
  jwt.sign(user, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'] });
export const verifyToken = (token: string) => jwt.verify(token, env.JWT_SECRET) as AuthUser;
