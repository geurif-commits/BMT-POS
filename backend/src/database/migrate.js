import fs from 'fs';
import path from 'path';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'bmtechrd_pos'
});

const sql = fs.readFileSync(path.join(process.cwd(), 'src/database/schema.sql'), 'utf-8');
await pool.query(sql);
console.log('Schema migrated');
await pool.end();
