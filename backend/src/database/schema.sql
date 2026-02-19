CREATE TYPE role AS ENUM ('ADMIN','SUPERVISOR','CASHIER','WAITER','BAR','KITCHEN');
CREATE TYPE payment_method AS ENUM ('CASH','CARD','MIXED');
CREATE TYPE ticket_status AS ENUM ('PENDING','IN_PROGRESS','READY','DELIVERED');

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  branch_id UUID NOT NULL,
  full_name VARCHAR(120) NOT NULL,
  username VARCHAR(80) UNIQUE NOT NULL,
  role role NOT NULL,
  password_hash TEXT NOT NULL,
  pin_hash TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_users_branch_role ON users(branch_id, role);

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY,
  name VARCHAR(80) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY,
  branch_id UUID NOT NULL,
  category_id UUID REFERENCES categories(id),
  name VARCHAR(120) NOT NULL,
  sku VARCHAR(40) UNIQUE NOT NULL,
  area VARCHAR(20) CHECK (area IN ('BAR','KITCHEN')) NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  deleted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_products_branch_deleted ON products(branch_id, deleted_at);

CREATE TABLE IF NOT EXISTS dining_tables (
  id UUID PRIMARY KEY,
  branch_id UUID NOT NULL,
  code VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE',
  waiter_id UUID REFERENCES users(id),
  opened_at TIMESTAMP,
  closed_at TIMESTAMP,
  UNIQUE(branch_id, code)
);
CREATE INDEX idx_tables_branch_status ON dining_tables(branch_id,status);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY,
  branch_id UUID NOT NULL,
  table_id UUID REFERENCES dining_tables(id),
  waiter_id UUID REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'OPEN',
  total NUMERIC(12,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  closed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(12,2) NOT NULL,
  ticket_status ticket_status DEFAULT 'PENDING'
);

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  cashier_id UUID REFERENCES users(id),
  method payment_method NOT NULL,
  amount_cash NUMERIC(12,2) DEFAULT 0,
  amount_card NUMERIC(12,2) DEFAULT 0,
  paid_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY,
  branch_id UUID,
  user_id UUID,
  action VARCHAR(120) NOT NULL,
  entity VARCHAR(80) NOT NULL,
  entity_id UUID,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_audit_branch_created ON audit_logs(branch_id, created_at DESC);
