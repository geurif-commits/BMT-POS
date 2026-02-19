import { query } from '../../database/client.js';

export const findUserByUsername = async (username: string) => (await query('SELECT * FROM users WHERE username=$1 AND is_active=TRUE', [username])).rows[0];
export const findUserById = async (id: string) => (await query('SELECT * FROM users WHERE id=$1', [id])).rows[0];
